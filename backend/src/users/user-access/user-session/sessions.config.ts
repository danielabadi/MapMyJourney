import { UserSession } from './UserSession';

export const SESSION_CONFIG = {
    secret: ['veryimportantsecret', 'notsoimportantsecret', 'highlyprobablysecret'],
    name: 'cookieName',
    cookie: {
        httpOnly: false,
        maxAge: 600000, // Time is in miliseconds
    },
    resave: false,
    saveUninitialized: false,
};

declare module 'express-session' {
    interface SessionData {
        userSession: UserSession;
    }
}
