import { Command } from '../../common/Command';
import { UserId } from '../../users/user-profile/UserId';
import { MarkerPhoto } from '../marker/MarkerPhoto';
import { MarkerPosition } from '../marker/MarkerPosition';
import { MarkerStatus } from '../marker/MarkerStatus';
import { MarkerTitle } from '../marker/MarkerTitle';

export class RegisterMarkerCommand implements Command {
    public readonly userId: UserId;
    public readonly status: MarkerStatus;
    public readonly title: MarkerTitle;
    public readonly description: string;
    public readonly start_date: Date | null;
    public readonly end_date: Date | null;
    public readonly position: MarkerPosition;
    public readonly photos: MarkerPhoto[];

    public constructor(
        userId: UserId,
        status: MarkerStatus,
        title: MarkerTitle,
        description: string,
        start_date: Date | null,
        end_date: Date | null,
        position: MarkerPosition,
        photos: MarkerPhoto[],
    ) {
        this.userId = userId;
        this.status = status;
        this.title = title;
        this.description = description;
        this.start_date = start_date;
        this.end_date = end_date;
        this.position = position;
        this.photos = photos;
    }
}
