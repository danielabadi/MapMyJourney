import { Email } from '../../user-profile/Email';
import { UserId } from '../../user-profile/UserId';
import { UserName } from '../../user-profile/UserName';

export class UserSession {
    public readonly userId: UserId;
    public readonly email: Email;
    public readonly name: UserName;

    public constructor(userId: UserId, email: Email, name: UserName) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }
}
