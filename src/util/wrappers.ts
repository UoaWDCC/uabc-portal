import { getCurrentUser } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/types/next-auth';

export const withError = (
  handler: (req: NextRequest, res: NextResponse, user: User) => any
) => {
  return async (req: NextRequest, res: NextResponse) => {
    try {
    const user = await getCurrentUser();
      return await handler(req, res, user);
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, {status: 500});
    }
  };
};




export const withUser = (
  handler: (req: NextRequest, res: NextResponse, user: User) => any
) => {
  return async (req: NextRequest, res: NextResponse) => {
    const user = await getCurrentUser();

    if (!user) {
        return new Response("ERROR: Unauthorized request", { status: 401 });
    }

    await handler(req, res, user);
  };
};


export const withAdmin = (
  handler: (req: NextRequest, res: NextResponse, user: User) => any
) => {
  return async (req: NextRequest, res: NextResponse) => {
    const user = await getCurrentUser();

    if (!user || !user.isAdmin) {
        return new Response("ERROR: No valid permissions", { status: 403 });
    }

    await handler(req, res, user);
  };
};
