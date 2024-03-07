import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/db";
import { paymentValidator } from "@/lib/validators";

/**
 * Get payment by id
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const paymentId = parseInt(params.id);

  if (!paymentId) {
    return NextResponse.json(
      { data: {}, msg: "No id provided in the request" },
      { status: 404 },
    );
  }

  const payment = await prisma.payment.findFirst({ where: { id: paymentId } });

  if (!payment) {
    return NextResponse.json(
      { data: {}, msg: `no payment found for id: ${paymentId}` },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: payment, msg: "success" });
}

/**
 * Create a new payment
 */
export async function POST(request: NextRequest) {
  const paymentBody = (await request.json()) as Omit<
    Prisma.PaymentGetPayload<{}>,
    "id"
  >;

  const { success } = paymentValidator.safeParse(paymentBody);

  if (!success) {
    return NextResponse.json(
      {
        data: {},
        msg: "failed, please include all required fields in response with the correct type",
      },
      {
        status: 404,
      },
    );
  }

  const payment = await prisma.payment.create({
    data: { ...paymentBody },
  });

  return NextResponse.json({ data: payment, msg: "success" });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const paymentId = parseInt(params.id);

  if (!paymentId) {
    return NextResponse.json(
      { data: {}, msg: "No id provided in the request" },
      { status: 404 },
    );
  }

  const paymentBody = (await request.json()) as Omit<
    Prisma.PaymentGetPayload<{}>,
    "id"
  >;

  const { success } = paymentValidator.safeParse(paymentBody);

  if (!success) {
    return NextResponse.json(
      {
        data: {},
        msg: "failed, please include all required fields in response with the correct type",
      },
      {
        status: 404,
      },
    );
  }

  const payment = await prisma.payment.update({
    data: { ...paymentBody },
    where: { id: paymentId },
  });

  return NextResponse.json({ data: payment, msg: "success" });
}
