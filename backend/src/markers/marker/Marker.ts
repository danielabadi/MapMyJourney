import { MarkerId } from './MarkerId';
import { MarkerStatus } from './MarkerStatus';
import { MarkerTitle } from './MarkerTitle';
import { MarkerPosition } from './MarkerPosition';
import { UserId } from '../../users/user-profile/UserId';

export class Marker {
    public readonly user_id: UserId;
    public readonly id: MarkerId;
    public readonly status: MarkerStatus;
    public readonly title: MarkerTitle;
    public readonly description: string;
    public readonly start_date: Date;
    public readonly end_date: Date;
    public readonly position: MarkerPosition;

    private constructor(
        user_id: UserId,
        markerId: MarkerId,
        status: MarkerStatus,
        title: MarkerTitle,
        description: string,
        start_date: Date,
        end_date: Date,
        position: MarkerPosition,
    ) {
        this.user_id = user_id;
        this.id = markerId;
        this.status = status;
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.position = position;
    }

    public static create(
        user_id: UserId,
        markerId: MarkerId,
        status: MarkerStatus,
        title: MarkerTitle,
        description: string,
        start_date: Date,
        end_date: Date,
        position: MarkerPosition,
    ): Marker {
        return new Marker(user_id, markerId, status, title, description, start_date, end_date, position);
    }

    public edit(
        user_id: UserId,
        markerId: MarkerId,
        status: MarkerStatus,
        title: MarkerTitle,
        description: string,
        start_date: Date,
        end_date: Date,
        position: MarkerPosition,
    ): Marker {
        if (user_id.id !== this.user_id.id) {
            throw 'user not allowed to edit this marker';
        }
        return new Marker(user_id, markerId, status, title, description, start_date, end_date, position);
    }
}
