import { HandlesCommand } from '../../common/HandlesCommand';
import { GetMarkerCommand } from './GetMarkerCommand';
import { MarkerRepository } from '../marker/MarkerRepository';
import { Marker } from '../marker/Marker';
import { UserId } from '../../users/user-profile/UserId';

export class GetMarkerCommandHandler implements HandlesCommand<GetMarkerCommand, Promise<Marker[] | null>> {
    private readonly markerRepository: MarkerRepository;

    public constructor(markerRepository: MarkerRepository) {
        this.markerRepository = markerRepository;
    }

    public async handle(command: GetMarkerCommand): Promise<Marker[] | null> {
        const userId = UserId.create(
            command.userId.id
        );

        const registeredMarker: Marker[] | null = await this.markerRepository.getByUserId(userId);
        return registeredMarker;
    }
}
