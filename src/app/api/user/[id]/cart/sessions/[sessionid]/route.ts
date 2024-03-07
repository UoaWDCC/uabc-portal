import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Post user checkoutCartItem
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string; sessionid: string } },
) {
  const { difficulty } = await req.json();
  const cart = await prisma.checkoutCart.findFirst({
    where: {
      userId: params.id,
    },
    include: {
      checkoutCartItem: true,
    },
  });

  if (!cart) {
    return NextResponse.json(
      { data: {}, msg: "cart not found" },
      { status: 404 },
    );
  }

  if (
    cart.checkoutCartItem.some(
      (item) => item.gameSessionId === parseInt(params.sessionid),
    )
  ) {
    return NextResponse.json(
      { data: {}, msg: "cart item already exists" },
      { status: 400 },
    );
  }

  const newCartItem = await prisma.checkoutCartItem.create({
    data: {
      checkoutCartId: cart.id,
      gameSessionId: parseInt(params.sessionid),
      difficulty,
    },
  });

  return NextResponse.json(newCartItem, { status: 201 });
}

/**
 * Delete checkoutCartItem
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; sessionid: string } },
) {
  const cart = await prisma.checkoutCart.findFirst({
    where: {
      userId: params.id,
    },
  });

  if (!cart) {
    return NextResponse.json(
      { data: {}, msg: "cart not found" },
      { status: 404 },
    );
  }

  const deletedCart = await prisma.checkoutCartItem.deleteMany({
    where: {
      checkoutCartId: cart.id,
      gameSessionId: parseInt(params.sessionid),
    },
  });
  return NextResponse.json(deletedCart, { status: 204 });
}
