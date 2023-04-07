import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ErrorHandler } from '../../errors/ErrorHandler';
import { Email } from '../user-profile/Email';
import { UserId } from '../user-profile/UserId';
import { UserName } from '../user-profile/UserName';
import { RegisterUserCommand } from './RegisterUserCommand';
import { IRegisterUserCommandHandler } from './RegisterUserCommandHandler';
import { RegisterUserRequest } from './RegisterUserRequest';
import { RegisterUserResponse } from './RegisterUserResponse';

export interface IRegisterUserController {
    registerUser(req: Request, res: Response): Promise<Response>;
}

export class RegisterUserController implements IRegisterUserController {
    private readonly commandHandler: IRegisterUserCommandHandler;

    public constructor(commandHandler: IRegisterUserCommandHandler) {
        this.commandHandler = commandHandler;
    }

    public async registerUser(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const registerUserRequest: RegisterUserRequest = req.body;
            const command: RegisterUserCommand = new RegisterUserCommand(
                Email.create(registerUserRequest.email),
                UserName.create(registerUserRequest.name),
                new Date(registerUserRequest.birthdate),
                registerUserRequest.password,
            );
            const createdUserId: UserId = await this.commandHandler.handle(command);
            const registerUserResponse: RegisterUserResponse = { id: createdUserId.id };
            return res.status(200).json({ success: true, data: registerUserResponse });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }
}
