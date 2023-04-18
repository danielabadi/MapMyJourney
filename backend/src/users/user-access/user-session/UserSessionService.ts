import { HashService } from '../../hash-service/HashService';
import { Email } from '../../user-profile/Email';
import { UserProfile } from '../../user-profile/UserProfile';
import { UserProfileRepository } from '../../user-profile/UserProfileRepository';
import { UserSession } from './UserSession';
import { UserSessionRepository } from './UserSessionRepository';

export interface UserSessionService {
    startSession(email: Email, password: string): Promise<UserSession>;
    endSession(userSession: UserSession): boolean;
}

export class UserSessionAuthenticationService implements UserSessionService {
    private readonly userProfileRepository: UserProfileRepository;
    private readonly hashService: HashService;
    private readonly userSessionRepository: UserSessionRepository;

    public constructor(
        userProfileRepository: UserProfileRepository,
        hashService: HashService,
        userSessionRepository: UserSessionRepository,
    ) {
        this.userProfileRepository = userProfileRepository;
        this.hashService = hashService;
        this.userSessionRepository = userSessionRepository;
    }

    public async startSession(email: Email, password: string): Promise<UserSession> {
        let user: UserProfile | null;
        try {
            user = await this.userProfileRepository.getByEmail(email);
            if (user === null) {
                throw new Error('Email ou senha inválidos');
            }
        } catch (err) {
            if (err) {
                throw new Error('Email ou senha inválidos');
            }
        }
        const existingUser: UserProfile = user!;
        const isValidPassword: boolean = await this.hashService.isSamePassword(password, existingUser.password);
        if (!isValidPassword) {
            throw new Error('Email ou senha inválidos');
        }

        const userSession: UserSession = new UserSession(existingUser.id, existingUser.email, existingUser.name);
        return this.userSessionRepository.insert(userSession);
    }

    public endSession(userSession: UserSession): boolean {
        return this.userSessionRepository.delete(userSession);
    }
}
