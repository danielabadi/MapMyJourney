import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HandlesCommand } from '../../common/HandlesCommand';
import { MarkerId } from '../marker/MarkerId';
import { ErrorHandler } from '../../errors/ErrorHandler';
import { RegisterMarkerRequest } from './RegisterMarkerRequest';
import { RegisterMarkerResponse } from './RegisterMarkerResponse';
import { RegisterMarkerCommand } from './RegisterMarkerCommand';
import { UserId } from '../../users/user-profile/UserId';
import { MarkerStatus } from '../marker/MarkerStatus';
import { MarkerTitle } from '../marker/MarkerTitle';
import { MarkerPosition } from '../marker/MarkerPosition';

export interface IRegisterMarkerController {
    registerMarker(req: Request, res: Response): Promise<Response>;
}

export class RegisterMarkerController implements IRegisterMarkerController {
    private readonly commandHandler: HandlesCommand<RegisterMarkerCommand, Promise<MarkerId>>;

    public constructor(commandHandler: HandlesCommand<RegisterMarkerCommand, Promise<MarkerId>>) {
        this.commandHandler = commandHandler;
    }

    public async registerMarker(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const registerMarkerRequest: RegisterMarkerRequest = req.body;
            const command: RegisterMarkerCommand = new RegisterMarkerCommand(
                UserId.create(req.session.userSession!.userId.id),
                MarkerStatus.create(registerMarkerRequest.status),
                MarkerTitle.create(registerMarkerRequest.title),
                registerMarkerRequest.description,
                new Date(registerMarkerRequest.start_date),
                new Date(registerMarkerRequest.end_date),
                MarkerPosition.create(registerMarkerRequest.lat, registerMarkerRequest.lng),
            );

            const createdMarkerId: MarkerId = await this.commandHandler.handle(command);
            const registerMarkerResponse: RegisterMarkerResponse = { id: createdMarkerId.id };
            return res.status(200).json({ success: true, data: registerMarkerResponse });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }
}
