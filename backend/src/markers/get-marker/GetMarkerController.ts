import { Request, Response } from 'express';
import { UserId } from '../../users/user-profile/UserId';
import { Marker } from '../marker/Marker';
import { GetMarkerCommand } from './GetMarkerCommand';
import { IGetMarkerCommandHandler } from './GetMarkerCommandHandler';
import { MarkerResponse } from './GetMarkerResponse';

export interface IGetMarkerController {
    getMarker(req: Request, res: Response): Promise<Response>;
}

export class GetMarkerController implements IGetMarkerController {
    private readonly commandHandler: IGetMarkerCommandHandler;

    public constructor(commandHandler: IGetMarkerCommandHandler) {
        this.commandHandler = commandHandler;
    }

    public async getMarker(req: Request, res: Response): Promise<Response> {
        const command: GetMarkerCommand = new GetMarkerCommand(UserId.create(req.session.userSession!.userId.id));

        const markers: Marker[] | null = await this.commandHandler.handle(command);
        return res.status(200).json({ success: true, data: markers?.map((element) => this.toResponse(element)) });
    }

    private toResponse(domainModel: Marker): MarkerResponse {
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
