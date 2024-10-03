import { NextResponse } from "next/server";
import type { ZodIssue } from "zod";

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

interface ApiSuccessResponse<T = { [key: string]: unknown }> {
  data: T;
}

type DetailType =
  | {
      [key: string]: string | string[];
    }
  | ZodIssue[];

interface ApiErrorResponse {
  code: string;
  message: string;
  details: DetailType;
}

export type CustomNextApiResponse = NextResponse<ApiResponse>;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const badRequest = ({
  message,
  details,
  code = "BAD_REQUEST",
  cors = false,
  cache = "private, no-store",
}: {
  message: string;
  details?: DetailType;
  code?: string;
  cors?: boolean;
  cache?: string;
}) => {
  const headers = {
    ...(cors && corsHeaders),
    "Cache-Control": cache,
  };

  return NextResponse.json(
    {
      code,
      message,
      details: details || {},
    } as ApiErrorResponse,
    {
      status: 400,
      headers,
    }
  );
};

const notFound = ({
  resourceType,
  resourceId,
  cors = false,
  cache = "private, no-store",
}: {
  resourceType: string;
  resourceId: string | number | null;
  cors?: boolean;
  cache?: string;
}) => {
  const headers = {
    ...(cors && corsHeaders),
    "Cache-Control": cache,
  };

  return NextResponse.json(
    {
      code: "NOT_FOUND",
      message: `${resourceType} not found`,
      details: {
        resource_id: resourceId,
        resource_type: resourceType,
      },
    } as ApiErrorResponse,
    {
      status: 404,
      headers,
    }
  );
};

const notAuthenticated = (
  cors: boolean = false,
  cache: string = "private, no-store"
) => {
  const headers = {
    ...(cors && corsHeaders),
    "Cache-Control": cache,
  };

  return NextResponse.json(
    {
      code: "NOT_AUTHENTICATED",
      message: "Not authenticated",
      details: {
        "x-Api-Key": "Header not provided or API Key invalid",
      },
    } as ApiErrorResponse,
    {
      status: 401,
      headers,
    }
  );
};

const unauthorized = (options?: { cors?: boolean; cache?: string }) => {
  const { cors = false, cache = "private, no-store" } = options || {};

  const headers = {
    ...(cors && corsHeaders),
    "Cache-Control": cache,
  };

  return NextResponse.json(
    {
      code: "UNAUTHORIZED",
      message: "You are not authorized to access this resource",
      details: {},
    } as ApiErrorResponse,
    {
      status: 403,
      headers,
    }
  );
};

const forbidden = (options?: { cors?: boolean; cache?: string }) => {
  const { cors = false, cache = "private, no-store" } = options || {};

  const headers = {
    ...(cors && corsHeaders),
    "Cache-Control": cache,
  };

  return NextResponse.json(
    {
      code: "FORBIDDEN",
      message: "You do not have the valid permissions to access this resource.",
    } as ApiErrorResponse,
    {
      status: 403,
      headers,
    }
  );
};

const internalServerError = ({
  message,
  cors = false,
  cache = "private, no-store",
}: {
  message: string;
  cors?: boolean;
  cache?: string;
}) => {
  const headers = {
    ...(cors && corsHeaders),
    "Cache-Control": cache,
  };

  return NextResponse.json(
    {
      code: "INTERNAL_SERVER_ERROR",
      message,
      details: {},
    } as ApiErrorResponse,
    {
      status: 500,
      headers,
    }
  );
};

const success = (
  data?: object,
  options?: {
    cors: boolean;
    cache: string;
  }
) => {
  const { cors = false, cache = "private, no-store" } = options || {};

  const headers = {
    ...(cors && corsHeaders),
    "Cache-Control": cache,
  };

  return NextResponse.json(data, {
    status: !!data ? 200 : 204,
    headers,
  });
};

export const responses = {
  badRequest,
  internalServerError,
  notAuthenticated,
  unauthorized,
  notFound,
  forbidden,
  success,
};
