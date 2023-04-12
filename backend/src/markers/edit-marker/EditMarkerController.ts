import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HandlesCommand } from '../../common/HandlesCommand';
import { ErrorHandler } from '../../errors/ErrorHandler';
import { UserId } from '../../users/user-profile/UserId';
import { MarkerId } from '../marker/MarkerId';
import { MarkerPosition } from '../marker/MarkerPosition';
import { MarkerStatus } from '../marker/MarkerStatus';
import { MarkerTitle } from '../marker/MarkerTitle';
import { EditMarkerCommand } from './EditMarkerCommand';
import { EditMarkerRequest } from './EditMarkerRequest';
import { EditMarkerResponse } from './EditMarkerResponse';
import { Marker } from '../marker/Marker';

export interface IEditMarkerController {
    editMarker(req: Request, res: Response): Promise<Response>;
}

export class EditMarkerController implements IEditMarkerController {
    private readonly commandHandler: HandlesCommand<EditMarkerCommand, Promise<Marker | null>>;

    public constructor(commandHandler: HandlesCommand<EditMarkerCommand, Promise<Marker | null>>) {
        this.commandHandler = commandHandler;
    }

    public async editMarker(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
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
            );

            const editedMarker: Marker | null = await this.commandHandler.handle(command);
            const editMarkerResponse: EditMarkerResponse = { 
                userId: editedMarker!.user_id.id,
                id: editedMarker!.id.id,
                status: editedMarker!.status.status,
                title: editedMarker!.title.title,
                description: editedMarker!.description,
                start_date: editedMarker!.start_date,
                end_date: editedMarker!.end_date,
                lat: Number(editedMarker!.position.lat),
                lng: Number(editedMarker!.position.lng),
             };
            return res.status(200).json({ success: true, data: editMarkerResponse });
        } catch (err) {
            return ErrorHandler.handleStandardFailure(err, res);
        }
    }
}
