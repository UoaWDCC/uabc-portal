import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { paymentValidator } from "@/lib/validators";

/**
 * Get payment by id
 */
export async function GET(request: NextRequest) {
  // @TODO Janky solution please fix in future
  const paymentId = request.nextUrl.pathname.split("/")[3];

  const payment = await prisma.payment.findFirst({ where: { id: paymentId } });

  if (!payment) {
    return NextResponse.json({ data: {}, msg: "error" }, { status: 404 });
  }

  return NextResponse.json({ data: payment, msg: "success" });
}

export async function PATCH(request: NextRequest) {
  // @TODO Janky solution please fix in future
  const paymentId = request.nextUrl.pathname.split("/")[3];

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
