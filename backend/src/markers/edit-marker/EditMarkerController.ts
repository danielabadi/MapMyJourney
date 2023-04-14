import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ErrorHandler } from '../../errors/ErrorHandler';
import { UserId } from '../../users/user-profile/UserId';
import { Marker } from '../marker/Marker';
import { MarkerId } from '../marker/MarkerId';
import { MarkerPhoto } from '../marker/MarkerPhoto';
import { MarkerPosition } from '../marker/MarkerPosition';
import { MarkerStatus } from '../marker/MarkerStatus';
import { MarkerTitle } from '../marker/MarkerTitle';
import { EditMarkerCommand } from './EditMarkerCommand';
import { IEditMarkerCommandHandler } from './EditMarkerCommandHandler';
import { EditMarkerRequest } from './EditMarkerRequest';
import { EditMarkerResponse } from './EditMarkerResponse';

export interface IEditMarkerController {
    editMarker(req: Request, res: Response): Promise<Response>;
}

export class EditMarkerController implements IEditMarkerController {
    private readonly commandHandler: IEditMarkerCommandHandler;

    public constructor(commandHandler: IEditMarkerCommandHandler) {
        this.commandHandler = commandHandler;
    }

    public async editMarker(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            const filenames = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.filename);
            const editMarkerRequest: EditMarkerRequest = req.body;

            const command: EditMarkerCommand = new EditMarkerCommand(
                MarkerId.create(editMarkerRequest.markerId),
                UserId.create(req.session.userSession!.userId.id),
                MarkerStatus.create(editMarkerRequest.status),
                MarkerTitle.create(editMarkerRequest.title),
                editMarkerRequest.description,
                new Date(editMarkerRequest.start_date),
                new Date(editMarkerRequest.end_date),
                MarkerPosition.create(editMarkerRequest.lat, editMarkerRequest.lng),
                filenames.map((filename) => MarkerPhoto.create(filename)),
            );

            const editedMarker: Marker | null = await this.commandHandler.handle(command);
            const editMarkerResponse: EditMarkerResponse = this.toResponse(editedMarker!);
            return res.status(200).json({ success: true, data: editMarkerResponse });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }

    private toResponse(domainModel: Marker): EditMarkerResponse {
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
