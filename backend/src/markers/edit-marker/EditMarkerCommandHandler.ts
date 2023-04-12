import { HandlesCommand } from '../../common/HandlesCommand';
import { MarkerId } from '../marker/MarkerId';
import { EditMarkerCommand } from './EditMarkerCommand';
import { MarkerRepository } from '../marker/MarkerRepository';
import { Marker } from '../marker/Marker';

export class EditMarkerCommandHandler implements HandlesCommand<EditMarkerCommand, Promise<Marker | null>> {
    private readonly markerRepository: MarkerRepository;

    public constructor(markerRepository: MarkerRepository) {
        this.markerRepository = markerRepository;
    }

    public async handle(command: EditMarkerCommand): Promise<Marker | null> {
        const markerToBeEdited: Marker | null = await this.markerRepository.getById(command.markerId);
        if (markerToBeEdited === null) {
            throw new Error('invalid marker');
        }
        const editedMarker: Marker = markerToBeEdited.edit(
            command.userId,
            command.markerId,
            command.status,
            command.title,
            command.desription,
            command.start_date,
            command.end_date,
            command.position,
        );

        const editedIdMarker: MarkerId = await this.markerRepository.update(editedMarker);
        return await this.markerRepository.getById(editedIdMarker);
    }
}
