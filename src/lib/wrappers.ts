import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getCurrentUser } from "@/lib/session";
import type { User } from "@/types/next-auth";
import { responses } from "./api/responses";
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
) => void | Response | Promise<void | Response>;

type UserRouteHandler = (
  req: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx: any,
  user: User
) => void | Response | Promise<void | Response>;

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
        return responses.unauthorized();

      if (options.admin && user?.role !== "admin") return responses.forbidden();

      // return the route handler
      return await handler(req, ctx, user);
    } catch (error) {
      if (error instanceof StatusError) {
        return NextResponse.json(
          { message: error.message, code: error.code },
          { status: error.status }
        );
      }
      if (error instanceof z.ZodError) {
        return responses.badRequest({
          message: error.issues[0].message,
          details: error.issues,
        });
      }
      // catch all errors
      console.error("Error:", error);
      return responses.internalServerError({
        message: "Internal Server Error.",
      });
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
