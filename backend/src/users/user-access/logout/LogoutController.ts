import { Request, Response } from 'express';
import { ErrorHandler } from '../../../errors/ErrorHandler';

export interface ILogoutController {
    logout(req: Request, res: Response): Response;
}

export class LogoutController implements ILogoutController {
    public logout(req: Request, res: Response): Response {
        try {
            if (req.session.userSession === undefined) {
                throw new Error('Usuario precisa estar logado para realizar logout');
            }
            req.session.destroy((err: Error) => {
                if (err) {
                    throw new Error('Erro ao realizar logout');
                }
            });
            return res.status(200).json({ success: true, data: null });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }
}
