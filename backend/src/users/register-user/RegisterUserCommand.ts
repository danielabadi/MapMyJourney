import { Command } from '../../common/Command';
import { Email } from '../user-profile/Email';
import { UserName } from '../user-profile/UserName';

export class RegisterUserCommand implements Command {
    public readonly email: Email;
    public readonly name: UserName;
    public readonly birthdate: Date;
    public readonly password: string;

    public constructor(email: Email, name: UserName, birthdate: Date, password: string) {
        this.email = email;
        this.name = name;
        this.birthdate = birthdate;
        this.password = password;
    }
}
