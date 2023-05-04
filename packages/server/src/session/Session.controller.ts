/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
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
import { Session } from "./Session.model";
import { SessionRepo } from "./Session.repo";
  
@Route("sessions")
export class SessionController extends Controller {
    @Get("{sessionId}")
    public async getSession (
        @Path() sessionId: string
    ): Promise<Session|null> {
        return await new SessionRepo().getById(sessionId);
    }

    @SuccessResponse("201", "Created") 
    @Post()
    public async createSession (
        @Body() request: Session //to be changed
    ) : Promise<void> {
        this.setStatus(201);
        await new SessionRepo().addSession(request);
        return; 
    }

    @SuccessResponse("201", "Updated") 
    @Put()
    public async updateSession (
        @Body() request: Session
    ) : Promise<void> {
        this.setStatus(201);
        await new SessionRepo().update(request);
        return;
    }
}