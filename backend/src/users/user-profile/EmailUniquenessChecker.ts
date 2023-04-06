import { Email } from './Email';
import { UserProfileRepository } from './UserProfileRepository';

export interface IEmailUniquenessChecker {
    emailExists(email: Email): Promise<boolean>;
}

export class EmailUniquenessChecker implements IEmailUniquenessChecker {
    private readonly userProfileRepo: UserProfileRepository;

    public constructor(userProfileRepo: UserProfileRepository) {
        this.userProfileRepo = userProfileRepo;
    }
    public async emailExists(email: Email): Promise<boolean> {
        return (await this.userProfileRepo.getByEmail(email)) != null;
    }
}
