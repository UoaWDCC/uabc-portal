import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {

    const prisma = new PrismaClient();

    const sessions = await prisma.session.findMany();

    return NextResponse.json(sessions)

}