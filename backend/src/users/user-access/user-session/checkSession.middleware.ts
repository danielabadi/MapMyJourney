import { NextFunction, Request, Response } from 'express';

export const checkLogin = (req: Request, res: Response, next: NextFunction): any => {
    if (req.session.userSession === undefined) {
        return res.status(403).send();
    }
    return next();
};

export const checkNotLogin = (req: Request, res: Response, next: NextFunction): any => {
    if (req.session.userSession !== undefined) {
        return res.status(403).send();
    }
    return next();
};
