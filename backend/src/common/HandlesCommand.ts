import { Command } from './Command';

export interface HandlesCommand<T extends Command, R> {
    handle(command: T): R;
}
