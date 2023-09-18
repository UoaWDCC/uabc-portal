import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Get user checkoutCart
 */
export async function GET(req: NextRequest, params: { id: string }) {
  const checkoutCart = await prisma.checkoutCart.findFirst({
    where: {
      userId: params.id,
    },
    include: {
      CheckoutCartItem: true,
    },
  });
  if (!checkoutCart) {
    return NextResponse.json({ data: null });
  }
  return NextResponse.json(checkoutCart);
}

/**
 * Create a new checkoutCart
 */
export async function POST(req: NextRequest, params: { id: string }) {
  const { status } = await req.json();
  const newCart = await prisma.checkoutCart.create({
    data: {
      userId: params.id,
      createdAt: new Date(),
      status: status,
    },
  });
  return NextResponse.json(newCart);
}

/**
 * Update checkoutCart
 */
export async function PATCH(req: NextRequest, params: { id: string }) {
  const { status } = await req.json();
  const updatedCart = await prisma.checkoutCart.update({
    where: {
      userId: params.id,
    },
    data: {
      userId: params.id,
      createdAt: new Date(),
      status: status,
    },
  });
  return NextResponse.json(updatedCart);
}

/**
 * Delete checkoutCart
 */
export async function DELETE(req: NextRequest, params: { id: string }) {
  const deletedCart = await prisma.checkoutCart.delete({
    where: {
      userId: params.id,
    },
  });
  return NextResponse.json(deletedCart);
}
