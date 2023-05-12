/***
 * @author Peter An <anpeteran2@gmail.com>
 */

import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Route,
  SuccessResponse,
} from "tsoa";
import { ICart } from "./Cart.schema";
import { CartRepo } from "./Cart.repo";

@Route("cart")
export class CartController extends Controller {
  cartRepo = new CartRepo();

  @Get("{userId}")
  public async getCart(@Path() userId: string) {
    let cart;

    try {
      cart = await this.cartRepo.createCart(userId);
      this.setStatus(201);
    } catch (e) {
      console.log(e);
      this.setStatus(400);
    }

    return cart;
  }

  @Post("/addSession")
  public async addSessionToUser(
    @Body() { userId, sessionId }: { userId: string; sessionId: string }
  ) {
    let cart;
    cart = await this.cartRepo.addSessionToCart(userId, sessionId);
    this.setStatus(201);
    return cart;
  }
}
