import { Request, Response } from 'express';
import { ErrorHandler } from '../../errors/ErrorHandler';
import { UserProfile } from '../user-profile/UserProfile';
import { GetUserCommand } from './GetUserCommand';
import { IGetUserCommandHandler } from './GetUserCommandHandler';
import { GetUserResponse } from './GetUserResponse';

export interface IGetUserController {
    getUser(req: Request, res: Response): Promise<Response>;
}

export class GetUserController implements IGetUserController {
    private readonly commandHandler: IGetUserCommandHandler;

    public constructor(commandHandler: IGetUserCommandHandler) {
        this.commandHandler = commandHandler;
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const command: GetUserCommand = new GetUserCommand(req.session.userSession!.userId);
            const user: UserProfile | null = await this.commandHandler.handle(command);

            return res.status(200).json({ success: true, data: user == null ? null : this.toResponse(user) });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }

    private toResponse(user: UserProfile): GetUserResponse {
        return {
            id: user.id.id,
            email: user.email.email,
            name: user.name.name,
            birthdate: user.birthdate.toISOString(),
            description: user.description.description,
        };
    }
}
