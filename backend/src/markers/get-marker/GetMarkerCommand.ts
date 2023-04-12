import { UserId } from "../../users/user-profile/UserId";
import { Command } from '../../common/Command';

export class GetMarkerCommand implements Command {
    public readonly userId: UserId;

    public constructor(
        userId: UserId,
    ) {
        this.userId = userId;
    }
}
