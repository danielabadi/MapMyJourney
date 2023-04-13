import { HandlesCommand } from '../../common/HandlesCommand';
import { Marker } from '../marker/Marker';
import { MarkerId } from '../marker/MarkerId';
import { MarkerRepository } from '../marker/MarkerRepository';
import { EditMarkerCommand } from './EditMarkerCommand';

export type IEditMarkerCommandHandler = HandlesCommand<EditMarkerCommand, Promise<Marker | null>>;

export class EditMarkerCommandHandler implements IEditMarkerCommandHandler {
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
            command.description,
            command.start_date,
            command.end_date,
            command.position,
            command.photos,
        );

        const editedIdMarker: MarkerId = await this.markerRepository.update(editedMarker);
        return await this.markerRepository.getById(editedIdMarker);
    }
}
