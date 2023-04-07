import { HandlesCommand } from '../../common/HandlesCommand';
import { UserId } from '../user-profile/UserId';
import { UserProfileRepository } from '../user-profile/UserProfileRepository';
import { EditUserCommand } from './EditUserCommand';

import { HashService } from '../hash-service/HashService';
import { UserProfile } from '../user-profile/UserProfile';

export type IEditUserCommandHandler = HandlesCommand<EditUserCommand, Promise<UserId>>;

export class EditUserCommandHandler implements IEditUserCommandHandler {
    private readonly userProfileRepository: UserProfileRepository;
    private readonly hashService: HashService;

    public constructor(userProfileRepository: UserProfileRepository, hashService: HashService) {
        this.userProfileRepository = userProfileRepository;
        this.hashService = hashService;
    }

    public async handle(command: EditUserCommand): Promise<UserId> {
        const userToBeEdited: UserProfile | null = await this.userProfileRepository.getById(command.userId);
        if (userToBeEdited === null) {
            throw new Error('Usuário não existe');
        }

        const editedUser: UserProfile = userToBeEdited.edit(
            command.userId,
            command.name,
            command.birthdate,
            command.description,
            await this.hashNewPassword(command.newPassword),
        );

        return await this.userProfileRepository.update(editedUser);
    }

    private async hashNewPassword(newPassword: string | null): Promise<string | null> {
        return newPassword === null ? null : await this.hashService.hashPassword(newPassword);
    }
}
