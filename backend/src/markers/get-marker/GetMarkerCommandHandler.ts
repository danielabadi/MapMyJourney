import { HandlesCommand } from '../../common/HandlesCommand';
import { Marker } from '../marker/Marker';
import { MarkerRepository } from '../marker/MarkerRepository';
import { GetMarkerCommand } from './GetMarkerCommand';

export type IGetMarkerCommandHandler = HandlesCommand<GetMarkerCommand, Promise<Marker[] | null>>;

export class GetMarkerCommandHandler implements IGetMarkerCommandHandler {
    private readonly markerRepository: MarkerRepository;

    public constructor(markerRepository: MarkerRepository) {
        this.markerRepository = markerRepository;
    }

    public async handle(command: GetMarkerCommand): Promise<Marker[] | null> {
        const userId = command.userId;

        const registeredMarker: Marker[] | null = await this.markerRepository.getByUserId(userId);
        return registeredMarker;
    }
}
