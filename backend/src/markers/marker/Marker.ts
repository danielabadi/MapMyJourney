import { UserId } from '../../users/user-profile/UserId';
import { MarkerId } from './MarkerId';
import { MarkerPhoto } from './MarkerPhoto';
import { MarkerPosition } from './MarkerPosition';
import { MarkerStatus } from './MarkerStatus';
import { MarkerTitle } from './MarkerTitle';

export class Marker {
    public readonly userId: UserId;
    public readonly id: MarkerId;
    public readonly status: MarkerStatus;
    public readonly title: MarkerTitle;
    public readonly description: string;
    public readonly start_date: Date;
    public readonly end_date: Date;
    public readonly position: MarkerPosition;
    public readonly photos: MarkerPhoto[];

    private constructor(
        userId: UserId,
        markerId: MarkerId,
        status: MarkerStatus,
        title: MarkerTitle,
        description: string,
        start_date: Date,
        end_date: Date,
        position: MarkerPosition,
        photos: MarkerPhoto[],
    ) {
        this.userId = userId;
        this.id = markerId;
        this.status = status;
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.position = position;
        this.photos = photos;
    }

    public static create(
        userId: UserId,
        markerId: MarkerId,
        status: MarkerStatus,
        title: MarkerTitle,
        description: string,
        start_date: Date,
        end_date: Date,
        position: MarkerPosition,
        photos: MarkerPhoto[],
    ): Marker {
        if (photos.length > 5) {
            throw new Error('Marcador não pode ter mais que 5 fotos');
        }
        return new Marker(userId, markerId, status, title, description, start_date, end_date, position, photos);
    }

    public edit(
        userId: UserId,
        markerId: MarkerId,
        status: MarkerStatus,
        title: MarkerTitle,
        description: string,
        start_date: Date,
        end_date: Date,
        position: MarkerPosition,
        photos: MarkerPhoto[],
    ): Marker {
        if (userId.id !== this.userId.id) {
            throw new Error('user not allowed to edit this marker');
        }
        if (photos.length > 5) {
            throw new Error('Marcador não pode ter mais que 5 fotos');
        }
        return new Marker(userId, markerId, status, title, description, start_date, end_date, position, photos);
    }
}
