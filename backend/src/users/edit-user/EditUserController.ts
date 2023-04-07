import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ErrorHandler } from '../../errors/ErrorHandler';
import { UserDescription } from '../user-profile/UserDescription';
import { UserId } from '../user-profile/UserId';
import { UserName } from '../user-profile/UserName';
import { EditUserCommand } from './EditUserCommand';
import { IEditUserCommandHandler } from './EditUserCommandHandler';
import { EditUserRequest } from './EditUserRequest';
import { EditUserResponse } from './EditUserResponse';

export interface IEditUserController {
    editUser(req: Request, res: Response): Promise<Response>;
}

export class EditUserController implements IEditUserController {
    private readonly commandHandler: IEditUserCommandHandler;

    public constructor(commandHandler: IEditUserCommandHandler) {
        this.commandHandler = commandHandler;
    }

    public async editUser(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const editUserRequest: EditUserRequest = req.body;
            const command: EditUserCommand = new EditUserCommand(
                req.session.userSession!.userId,
                UserName.create(editUserRequest.name),
                new Date(editUserRequest.birthdate),
                UserDescription.create(editUserRequest.description),
                editUserRequest.newPassword == undefined ? null : editUserRequest.newPassword,
            );
            const editedUserId: UserId = await this.commandHandler.handle(command);
            const editedUserResponse: EditUserResponse = { id: editedUserId.id };
            return res.status(200).json({ success: true, data: editedUserResponse });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }
}
