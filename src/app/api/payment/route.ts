import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/db";
import { paymentValidator } from "@/lib/validators";

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
