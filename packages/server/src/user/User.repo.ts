import { User} from "./User.model";
import { DBUser, userSchema } from "./User.schema";
import { InferSchemaType } from 'mongoose';

const ObjectId = require('mongodb').ObjectID

// A post request should not contain an id.
export class UserRepo {

  async addUser(user: User): Promise<User> {
    const dbo = UserRepo.UserToDbo(User);
    await DBUser.create(dbo);
    return user;
  }

  public getFutureSessions() {
    //function to go here
    return;
  }

  public getPastSessions() {
    //function to go here
    return;
  }
}