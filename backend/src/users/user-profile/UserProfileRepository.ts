import { Knex } from 'knex';
import { Email } from './Email';
import { UserId } from './UserId';
import { UserProfile } from './UserProfile';
import { UserProfilePersistence } from './UserProfilePersistence';
import { UserName } from './UserName';
import { UserDescription } from './UserDescription';

export interface UserProfileRepository {
    insert(userProfile: UserProfile): Promise<UserId>;
    update(userProfile: UserProfile): Promise<UserId>;
    getById(userId: UserId): Promise<UserProfile | null>;
    getByEmail(email: Email): Promise<UserProfile | null>;
}

export class SQLUserProfileRepository implements UserProfileRepository {
    private readonly knex: Knex;
    private readonly tableName: string;

    public constructor(knex: Knex, tableName: string) {
        this.knex = knex;
        this.tableName = tableName;
    }

    UserProfilePersistence = () => {
        return this.knex<UserProfilePersistence>(this.tableName);
    };

    public async insert(userProfile: UserProfile): Promise<UserId> {
        const persistenceModel: UserProfilePersistence = this.toPersistence(userProfile);

        const createdUser: any[] = await this.knex.transaction(async (trx) => {
            const createdUser = await trx<UserProfilePersistence>(this.tableName).insert(persistenceModel, 'id');
            return createdUser;
        });
        const createdUserId = createdUser[0];

        return UserId.create(createdUserId.id);
    }

    public async update(userProfile: UserProfile): Promise<UserId> {
        const persistenceModel: UserProfilePersistence = this.toPersistence(userProfile);

        const updatedUser: any[] = await this.knex.transaction(async (trx) => {
            const updatedUser = await trx<UserProfilePersistence>(this.tableName)
                .where('id', persistenceModel.id)
                .update(persistenceModel, 'id');
            return updatedUser;
        });
        const updatedUserId = updatedUser[0];

        return UserId.create(updatedUserId.id);
    }

    public async getById(userId: UserId): Promise<UserProfile | null> {
        const persistedModel = await this.UserProfilePersistence().where('id', userId.id).first();

        if (persistedModel === undefined) {
            return null;
        }
        const domainModel = this.toDomain(persistedModel);

        return domainModel;
    }

    public async getByEmail(email: Email): Promise<UserProfile | null> {
        const persistedModel = await this.UserProfilePersistence().where('email', email.email).first();

        if (persistedModel === undefined) {
            return null;
        }

        return this.toDomain(persistedModel);
    }

    private toDomain(persistedModel: UserProfilePersistence): UserProfile {
        return UserProfile.create(
            UserId.create(persistedModel.id),
            Email.create(persistedModel.email),
            UserName.create(persistedModel.name),
            new Date(persistedModel.birthdate),
            UserDescription.create(persistedModel.description),
            persistedModel.password,
        );
    }

    private toPersistence(domainModel: UserProfile): UserProfilePersistence {
        return {
            id: domainModel.id.id,
            name: domainModel.name.name,
            email: domainModel.email.email,
            birthdate: domainModel.birthdate.toISOString(),
            description: domainModel.description.description,
            password: domainModel.password,
        };
    }
}
