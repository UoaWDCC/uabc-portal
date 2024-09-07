import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/session";
import type { User } from "@/types/next-auth";
import { StatusError } from "./exceptions";

type EndpointOptions = {
  protected?: boolean;
  admin?: boolean;
};

type Handler = (
  req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: any,
  user?: User | undefined
) => unknown;

type UserRouteHandler = (
  req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx: any,
  user: User
) => unknown;

const defaultEndpointOptions = { protected: false, admin: false };

export function routeWrapper(
  handler: Handler,
  options: EndpointOptions = defaultEndpointOptions
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (req: NextRequest, ctx: any) => {
    try {
      // check if request is authenticated
      const user = await getCurrentUser();

      if ((options.protected || options.admin) && !user)
        return new Response("ERROR: Unauthorized request", { status: 401 });

      if (options.admin && user?.role !== "admin")
        return new Response("ERROR: No valid permissions", { status: 403 });

      // return the route handler
      return await handler(req, ctx, user);
    } catch (error) {
      if (error instanceof StatusError) {
        return NextResponse.json(
          { message: error.message },
          { status: error.status }
        );
      }
      if (error instanceof z.ZodError) {
        return NextResponse.json({ errors: error.issues }, { status: 400 });
      }
      // catch all errors
      console.error("Error:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}

export function userRouteWrapper(handler: UserRouteHandler) {
  return routeWrapper((req, ctx, user) => handler(req, ctx, user!), {
    protected: true,
  });
}

export function adminRouteWrapper(handler: UserRouteHandler) {
  return routeWrapper((req, ctx, user) => handler(req, ctx, user!), {
    admin: true,
  });
}
