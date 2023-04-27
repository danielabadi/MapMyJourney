import { HandlesCommand } from '../../common/HandlesCommand';
import { UserProfileRepository } from '../user-profile/UserProfileRepository';
import { GetUserCommand } from './GetUserCommand';

import { UserProfile } from '../user-profile/UserProfile';

export type IGetUserCommandHandler = HandlesCommand<GetUserCommand, Promise<UserProfile | null>>;

export class GetUserCommandHandler implements IGetUserCommandHandler {
    private readonly userProfileRepository: UserProfileRepository;

    public constructor(userProfileRepository: UserProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }

    public async handle(command: GetUserCommand): Promise<UserProfile | null> {
        return await this.userProfileRepository.getById(command.userId);
    }
}
