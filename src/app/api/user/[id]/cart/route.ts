import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db";

/**
 * Get user checkoutCart
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = params.id;
  const checkoutCart = await prisma.checkoutCart.findFirst({
    where: {
      userId,
    },
    include: {
      CheckoutCartItem: true,
    },
  });
  if (!checkoutCart) {
    return NextResponse.json(
      { data: {}, msg: "cart not found" },
      { status: 404 },
    );
  }
  return NextResponse.json(checkoutCart);
}

/**
 * Create a new checkoutCart
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { status } = await req.json();
  const userId = params.id;
  const checkoutCart = await prisma.checkoutCart.findFirst({
    where: {
      userId,
    },
  });

  if (checkoutCart) {
    return NextResponse.json(
      { data: {}, msg: "cart already exists" },
      { status: 400 },
    );
  }

  const newCart = await prisma.checkoutCart.create({
    data: {
      userId,
      createdAt: new Date(),
      status: status,
    },
  });
  return NextResponse.json(newCart);
}

/**
 * Update checkoutCart
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { status } = await req.json();
  const userId = params.id;

  const updatedCart = await prisma.checkoutCart.update({
    where: {
      userId,
    },
    data: {
      userId,
      status: status,
    },
  });
  if (!updatedCart) {
    return NextResponse.json(
      { data: {}, msg: "cart not found" },
      { status: 404 },
    );
  }
  return NextResponse.json(updatedCart);
}

/**
 * Delete checkoutCart
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = params.id;
  const deletedCart = await prisma.checkoutCart.delete({
    where: {
      userId,
    },
  });
  if (!deletedCart) {
    return NextResponse.json(
      { data: {}, msg: "cart not found" },
      { status: 404 },
    );
  }
  return NextResponse.json(deletedCart);
}