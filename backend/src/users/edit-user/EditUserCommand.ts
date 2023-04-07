import { Command } from '../../common/Command';
import { UserDescription } from '../user-profile/UserDescription';
import { UserId } from '../user-profile/UserId';
import { UserName } from '../user-profile/UserName';

export class EditUserCommand implements Command {
    public readonly userId: UserId;
    public readonly name: UserName;
    public readonly birthdate: Date;
    public readonly description: UserDescription;
    public readonly newPassword: string | null;

    public constructor(
        userId: UserId,
        name: UserName,
        birthdate: Date,
        description: UserDescription,
        newPassword: string | null,
    ) {
        this.userId = userId;
        this.name = name;
        this.birthdate = birthdate;
        this.description = description;
        this.newPassword = newPassword;
    }
}
