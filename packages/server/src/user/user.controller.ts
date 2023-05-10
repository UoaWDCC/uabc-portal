// src/users/usersController.ts

// Must be updated for new schema
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
      @Path() userId: number,
      @Query() name?: string
    ): Promise<User> {
      return new UserRepo().getByID(userId, name);
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
  }
  