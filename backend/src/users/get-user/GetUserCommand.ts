import { Command } from '../../common/Command';
import { UserId } from '../user-profile/UserId';

export class GetUserCommand implements Command {
    public readonly userId: UserId;

    public constructor(userId: UserId) {
        this.userId = userId;
    }
}
