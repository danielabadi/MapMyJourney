import { Email } from './Email';
import { UserDescription } from './UserDescription';
import { UserId } from './UserId';
import { UserName } from './UserName';

export class UserProfile {
    public readonly id: UserId;
    public readonly email: Email;
    public readonly name: UserName;
    public readonly birthdate: Date;
    public readonly description: UserDescription;
    public readonly password: string;

    private constructor(
        userId: UserId,
        email: Email,
        name: UserName,
        birthdate: Date,
        description: UserDescription,
        password: string,
    ) {
        this.id = userId;
        this.email = email;
        this.name = name;
        this.birthdate = birthdate;
        this.description = description;
        this.password = password;
    }

    public static create(
        userId: UserId,
        email: Email,
        name: UserName,
        birthdate: Date,
        description: UserDescription,
        password: string,
    ): UserProfile {
        return new UserProfile(userId, email, name, birthdate, description, password);
    }

    public edit(
        userId: UserId,
        name: UserName,
        birthdate: Date,
        description: UserDescription,
        newPassword: string | null,
    ): UserProfile {
        if (userId.id !== this.id.id) {
            throw new Error('Usuario nao pode ser atualizado por esse usuário');
        }

        return new UserProfile(
            this.id,
            this.email,
            name,
            birthdate,
            description,
            newPassword === null ? this.password : newPassword,
        );
    }
}
