/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */

import { Session } from "./Session.model";
import { DBSession, sessionSchema } from "./Session.schema";
import { InferSchemaType } from 'mongoose';

const ObjectId = require('mongodb').ObjectID

export class SessionRepo {

    /***
     * Adds session to database.
     */
    async addSession(session: Session): Promise<Session> {
        const dbo = SessionRepo.sessionToDbo(session);
        await DBSession.create(dbo);
        return session;
    }

    /**
     * Finds a session in the database that matches the provided id or returns null if none exists.
     */
    async getById(id: string): Promise<Session|null> {
        const dbo = await DBSession.findById(id);
        if (dbo === null) {
            return null;
        }
        return SessionRepo.DboToSession(dbo);
    }

    /**
     * Finds a payment in the database that matches the provided id and updates it with the provided data or returns null if none exists
     */
    async update(session: Session): Promise<Session|null> {
        const dbo = await DBSession.findByIdAndUpdate(session.id, SessionRepo.sessionToDbo(session));
        if (dbo === null) {
            return null;
        }
        return SessionRepo.DboToSession(dbo);
    }

    /**
     * Takes a Session object and returns an primitive object representing the database schema for sessions
     */
    static sessionToDbo(session: Session): InferSchemaType<typeof sessionSchema> {
        return {
            _id: session.id,
            location: session.location,
            dateTime: session.dateTime,
            maxUsers: session.maxUsers,
            bookingOpen: session.bookingOpen,
            bookingClose: session.bookingClose,
        }
    }

    /**
     * Takes a primitive object representing the database schema for a session and returns a Session object
     */
    static DboToSession(dbo: InferSchemaType<typeof sessionSchema>): Session {
        return new Session(
            dbo.location, 
            dbo.dateTime, 
            dbo.maxUsers, 
            dbo.bookingOpen, 
            dbo.bookingClose,
            dbo._id
        )
    }
}