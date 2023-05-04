/**
 * @author David Zhu <dzhu292@aucklanduni.ac.nz>
 */


/**
 * Represents a session that users can book.
 */
export class Session {
    constructor(
        public location: string, 
        public dateTime: Date, 
        public maxUsers: number, 
        public bookingOpen: Date, 
        public bookingClose: Date,
        public id?: string
        ) {} 
}