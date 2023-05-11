/**
 * @author Aditya Tendulkar <aten037@aucklanduni.ac.nz>
 */

import { University, User } from "./User.model";
import { DBUser, userSchema } from "./User.schema";
import { InferSchemaType } from 'mongoose';

const ObjectId = require('mongodb').ObjectID

// A post request should not contain an id.
export class UserRepo {

  async addUser(user: User): Promise<User> {
    const dbo = UserRepo.UserToDbo(user);
    await DBUser.create(dbo);
    return user;
  }

  /**
     * Finds a user in the database that matches the provided id or returns null if none exists.
     */
  async getByID(id: string): Promise<User | null> {
    const dbo = await DBUser.findById(id);
    if (dbo === null) {
      return null;
    }
    return UserRepo.DboToUser(dbo);
  }

  /**
   * Finds a payment in the database that matches the provided id and updates it with the provided data or returns null if none exists
   */
  async update(user: User): Promise<User | null> {
    const dbo = await DBUser.findByIdAndUpdate(user.userId, UserRepo.UserToDbo(user));
    if (dbo === null) {
      return null;
    }
    return UserRepo.DboToUser(dbo);
  }


  //to be completed
  async getFutureUsers() {
    //function to go here
    return;
  }

  async getPastUsers() {
    //function to go here
    return;
  }

  static UserToDbo(user: User): InferSchemaType<typeof userSchema> {
    return {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isMember: user.isMember,
      sessionsRemaining: user.sessionsRemaining,
      previousDifficulty:user.previousDifficulty,
      university:user.university,
      universityID: user.universityID,
    }
  }

  /**
   * Takes a primitive object representing the database schema for a User and returns a User object
   */
  static DboToUser(dbo: InferSchemaType<typeof userSchema>): User {
    return new User(
      dbo.userId,
      dbo.firstName,
      dbo.lastName,
      dbo.email,
      dbo.isMember,
      dbo.sessionsRemaining,
      dbo.previousDifficulty,
      dbo.university,
      dbo.universityID
    )
  }
}

