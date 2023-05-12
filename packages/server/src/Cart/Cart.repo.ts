/***
 * @author Peter An <anpeteran2@gmail.com>
 */

import { DBCart, ICart } from "./Cart.schema";

export class CartRepo {
  /**
   * Adds a Payment to the database
   */
  async createCart(userId: string) {
    let cart = await DBCart.findOne({ userId });

    if (cart) {
      return { error: "User already has cart!" };
    }

    cart = await DBCart.create({ userId, sessions: [] });

    return cart;
  }

  async addSessionToCart(userId: string, sessionId: string) {
    let cart = await DBCart.findOne({ userId });

    // Create new cart if user doesn't have one
    if (!cart) {
      cart = await DBCart.create({ userId, sessions: [] });
    }

    console.log(
      await cart.updateOne({
        $push: { sessions: sessionId },
      })
    );
    cart.save();

    return { success: "Success!" };
  }
}
