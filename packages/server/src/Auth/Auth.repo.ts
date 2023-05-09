/***
 * @author Peter An <anpeteran2@gmail.com>
 */

import {
    Auth,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../firebase";

export class AuthRepo {
    private auth: Auth;
    constructor() {
        this.auth = getAuth(app);
    }

    /**
     * Log In user with email password
     */
    async login(email: string, password: string) {
        return signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                return user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return { code: errorCode, message: errorMessage };
            });
    }

    async signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                // Sign Up
                const user = userCredential.user;
                console.log(user);
                return user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return { code: errorCode, message: errorMessage };
            });
    }
}
