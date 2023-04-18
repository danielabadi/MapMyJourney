import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ErrorHandler } from '../../../errors/ErrorHandler';
import { Email } from '../../user-profile/Email';
import { UserSession } from '../user-session/UserSession';
import { UserSessionService } from '../user-session/UserSessionService';
import { LoginRequest } from './LoginRequest';

export interface ILoginController {
    login(req: Request, res: Response): Promise<Response>;
}

export class LoginController implements ILoginController {
    private readonly userSessionService: UserSessionService;

    public constructor(userSessionService: UserSessionService) {
        this.userSessionService = userSessionService;
    }

    public async login(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        try {
            const request: LoginRequest = { email: req.body.email, password: req.body.password };
            const userSession: UserSession = await this.userSessionService.startSession(
                Email.create(request.email),
                request.password,
            );
            req.session.regenerate((err: Error) => {
                if (err) {
                    throw new Error('Erro no login');
                }
            });
            req.session.userSession = userSession;
            return res.status(200).json({ success: true, data: null });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }
}
