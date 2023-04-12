import { HandlesCommand } from '../../common/HandlesCommand';
import { MarkerId } from '../marker/MarkerId';
import { RegisterMarkerCommand } from './RegisterMarkerCommand';
import { MarkerRepository } from '../marker/MarkerRepository';
import { Marker } from '../marker/Marker';
import { v4 as uuidv4 } from 'uuid';

export class RegisterMarkerCommandHandler implements HandlesCommand<RegisterMarkerCommand, Promise<Marker | null>> {
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
            command.desription,
            command.start_date,
            command.end_date,
            command.position,
        );

        const registeredIdMarker: MarkerId = await this.markerRepository.insert(markerToBeRegistered);
        const registeredMarker: Marker | null = await this.markerRepository.getById(registeredIdMarker);
        return registeredMarker;
    }
}