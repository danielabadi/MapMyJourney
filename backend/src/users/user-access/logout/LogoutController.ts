import { Request, Response } from 'express';
import { ErrorHandler } from '../../../errors/ErrorHandler';
import { UserSessionService } from '../user-session/UserSessionService';

export interface ILogoutController {
    logout(req: Request, res: Response): Response;
}

export class LogoutController implements ILogoutController {
    private readonly userSessionService: UserSessionService;

    public constructor(userSessionService: UserSessionService) {
        this.userSessionService = userSessionService;
    }

    public logout(req: Request, res: Response): Response {
        try {
            const result: boolean = this.userSessionService.endSession(req.session.userSession!);
            req.session.destroy((err: Error) => {
                if (err) {
                    throw new Error('Erro ao realizar logout');
                }
            });
            return res.status(200).json({ success: result, data: null });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }
}
