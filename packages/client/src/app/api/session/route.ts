import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const client = new PrismaClient();

    const session = await client.dbsessions.findMany();

    client.$disconnect;

    return NextResponse.json(session)
}



