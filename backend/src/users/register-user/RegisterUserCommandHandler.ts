import { v4 as uuidv4 } from 'uuid';
import { UserId } from '../user-profile/UserId';
import { RegisterUserCommand } from './RegisterUserCommand';

import { HandlesCommand } from '../../common/HandlesCommand';
import { HashService } from '../hash-service/HashService';
import { IEmailUniquenessChecker } from '../user-profile/EmailUniquenessChecker';
import { UserDescription } from '../user-profile/UserDescription';
import { UserProfile } from '../user-profile/UserProfile';
import { UserProfileRepository } from '../user-profile/UserProfileRepository';

export type IRegisterUserCommandHandler = HandlesCommand<RegisterUserCommand, Promise<UserId>>;

export class RegisterUserCommandHandler implements IRegisterUserCommandHandler {
    private readonly userProfileRepository: UserProfileRepository;
    private readonly hashService: HashService;
    private readonly emailUniquenessChecker: IEmailUniquenessChecker;

    public constructor(
        userProfileRepository: UserProfileRepository,
        hashService: HashService,
        emailUniquenessChecker: IEmailUniquenessChecker,
    ) {
        this.userProfileRepository = userProfileRepository;
        this.hashService = hashService;
        this.emailUniquenessChecker = emailUniquenessChecker;
    }

    public async handle(command: RegisterUserCommand): Promise<UserId> {
        const email = command.email;
        if (await this.emailUniquenessChecker.emailExists(email)) {
            throw new Error('Já existe um usuário cadastrado com esse email');
        }

        const name = command.name;
        const birthdate = command.birthdate;
        const hashedPassword: string = await this.hashService.hashPassword(command.password);

        const userToBeRegistered = UserProfile.create(
            UserId.create(uuidv4()),
            email,
            name,
            birthdate,
            UserDescription.create(''),
            hashedPassword,
        );

        const registeredUser: UserId = await this.userProfileRepository.insert(userToBeRegistered);
        return registeredUser;
    }
}
