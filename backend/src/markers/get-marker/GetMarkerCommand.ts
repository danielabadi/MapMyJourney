import { Command } from '../../common/Command';
import { UserId } from '../../users/user-profile/UserId';

export class GetMarkerCommand implements Command {
    public readonly userId: UserId;

    public constructor(userId: UserId) {
        this.userId = userId;
    }
}
