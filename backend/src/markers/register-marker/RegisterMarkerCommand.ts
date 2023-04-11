import { MarkerTitle } from '../marker/MarkerTitle';
import { MarkerStatus } from '../marker/MarkerStatus';
import { MarkerPosition } from '../marker/MarkerPosition';
import { UserId } from '../../users/user-profile/UserId';
import { Command } from '../../common/Command';

export class RegisterMarkerCommand implements Command {
    public readonly userId: UserId;
    public readonly status: MarkerStatus;
    public readonly title: MarkerTitle;
    public readonly desription: string;
    public readonly start_date: Date;
    public readonly end_date: Date;
    public readonly position: MarkerPosition;

    public constructor(
        userId: UserId,
        status: MarkerStatus,
        title: MarkerTitle,
        desription: string,
        start_date: Date,
        end_date: Date,
        position: MarkerPosition,
    ) {
        this.userId = userId;
        this.status = status;
        this.title = title;
        this.desription = desription;
        this.start_date = start_date;
        this.end_date = end_date;
        this.position = position;
    }
}
