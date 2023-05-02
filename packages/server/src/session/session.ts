export class Session {
    constructor(
        public id: number, 
        public location: string, 
        public dateTime: Date, 
        public maxUsers: number, 
        public bookingOpen: Date, 
        public bookingClose: Date
        ) {} 
}