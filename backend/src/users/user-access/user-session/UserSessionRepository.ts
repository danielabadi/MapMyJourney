import { UserId } from '../../user-profile/UserId';
import { UserSession } from './UserSession';

export interface UserSessionRepository {
    getByUserId(userId: UserId): UserSession | undefined;
    insert(userSession: UserSession): UserSession;
    delete(userSession: UserSession): boolean;
}

export class InMemoryUserSessionRepository implements UserSessionRepository {
    private inMemoryMap = new Map<string, UserSession>();

    public getByUserId(userId: UserId): UserSession | undefined {
        return this.inMemoryMap.get(userId.id);
    }

    public insert(userSession: UserSession): UserSession {
        this.inMemoryMap.set(userSession.userId.id, userSession);
        return userSession;
    }

    public delete(userSession: UserSession): boolean {
        const userId: string = userSession.userId.id;
        if (this.inMemoryMap.has(userId)) {
            this.inMemoryMap.delete(userSession.userId.id);
            return true;
        }

        return false;
    }
}
