/***
 * @author Peter An <anpeteran2@gmail.com>
 */

import {
    Controller,
    Get,
    Path,
    Body,
    Post,
    Put,
    Route,
    SuccessResponse,
} from "tsoa";
import { AuthRepo } from "./Auth.repo";

interface LoginParams {
    email: string;
    password: string;
}

@Route("auth")
export class AuthController extends Controller {
    @Post("login")
    public async login(@Body() requestBody: LoginParams) {
        return await new AuthRepo().login(
            requestBody.email,
            requestBody.password
        );
    }

    @Post("signup")
    public async signup(@Body() requestBody: LoginParams) {
        return await new AuthRepo().signUp(
            requestBody.email,
            requestBody.password
        );
    }
}
