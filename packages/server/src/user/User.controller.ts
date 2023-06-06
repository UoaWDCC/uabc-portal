/**
 * @author Aditya Tendulkar <aten037@aucklanduni.ac.nz>
 */

import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "./User.model";
import { UserRepo } from "./User.repo";

@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(
    @Path() userId: string,
  ): Promise<User|null> {
    return await new UserRepo().getByID(userId);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: User
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UserRepo().addUser(requestBody);
    return;
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async updateUser(
    @Body() requestBody: User
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UserRepo().update(requestBody);
    return;
  }
}
