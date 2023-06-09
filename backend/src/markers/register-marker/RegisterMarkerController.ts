import { Request, Response } from 'express';
import { ErrorHandler } from '../../errors/ErrorHandler';
import { UserId } from '../../users/user-profile/UserId';
import { Marker } from '../marker/Marker';
import { MarkerPhoto } from '../marker/MarkerPhoto';
import { MarkerPosition } from '../marker/MarkerPosition';
import { MarkerStatus } from '../marker/MarkerStatus';
import { MarkerTitle } from '../marker/MarkerTitle';
import { RegisterMarkerCommand } from './RegisterMarkerCommand';
import { IRegisterMarkerCommandHandler } from './RegisterMarkerCommandHandler';
import { RegisterMarkerRequest } from './RegisterMarkerRequest';
import { RegisterMarkerResponse } from './RegisterMarkerResponse';

export interface IRegisterMarkerController {
    registerMarker(req: Request, res: Response): Promise<Response>;
}

export class RegisterMarkerController implements IRegisterMarkerController {
    private readonly commandHandler: IRegisterMarkerCommandHandler;

    public constructor(commandHandler: IRegisterMarkerCommandHandler) {
        this.commandHandler = commandHandler;
    }

    public async registerMarker(req: Request, res: Response): Promise<Response> {
        try {
            const filenames = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.filename);
            const registerMarkerRequest: RegisterMarkerRequest = req.body;
            const command: RegisterMarkerCommand = new RegisterMarkerCommand(
                UserId.create(req.session.userSession!.userId.id),
                MarkerStatus.create(registerMarkerRequest.status),
                MarkerTitle.create(registerMarkerRequest.title),
                registerMarkerRequest.description,
                registerMarkerRequest.start_date == 'null' ? null : new Date(registerMarkerRequest.start_date),
                registerMarkerRequest.end_date == 'null' ? null : new Date(registerMarkerRequest.end_date),
                MarkerPosition.create(registerMarkerRequest.lat, registerMarkerRequest.lng),
                filenames.map((filename) => MarkerPhoto.create(filename)),
            );

            const createdMarker: Marker | null = await this.commandHandler.handle(command);
            const registerMarkerResponse: RegisterMarkerResponse = this.toResponse(createdMarker!);
            return res.status(200).json({ success: true, data: registerMarkerResponse });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }

    private toResponse(domainModel: Marker): RegisterMarkerResponse {
        return {
            userId: domainModel.userId.id,
            id: domainModel.id.id,
            status: domainModel.status.status,
            title: domainModel.title.title,
            description: domainModel.description,
            start_date: domainModel.start_date,
            end_date: domainModel.end_date,
            lat: domainModel.position.lat,
            lng: domainModel.position.lng,
            photos: domainModel.photos.map((photo) => {
                return photo.filename;
            }),
        };
    }
}
