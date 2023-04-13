import { v4 as uuidv4 } from 'uuid';
import { HandlesCommand } from '../../common/HandlesCommand';
import { Marker } from '../marker/Marker';
import { MarkerId } from '../marker/MarkerId';
import { MarkerRepository } from '../marker/MarkerRepository';
import { RegisterMarkerCommand } from './RegisterMarkerCommand';

export type IRegisterMarkerCommandHandler = HandlesCommand<RegisterMarkerCommand, Promise<Marker | null>>;

export class RegisterMarkerCommandHandler implements IRegisterMarkerCommandHandler {
    private readonly markerRepository: MarkerRepository;

    public constructor(markerRepository: MarkerRepository) {
        this.markerRepository = markerRepository;
    }

    public async handle(command: RegisterMarkerCommand): Promise<Marker | null> {
        const markerToBeRegistered = Marker.create(
            command.userId,
            MarkerId.create(uuidv4()),
            command.status,
            command.title,
            command.description,
            command.start_date,
            command.end_date,
            command.position,
            command.photos,
        );

        const registeredIdMarker: MarkerId = await this.markerRepository.insert(markerToBeRegistered);
        const registeredMarker: Marker | null = await this.markerRepository.getById(registeredIdMarker);
        return registeredMarker;
    }
}
