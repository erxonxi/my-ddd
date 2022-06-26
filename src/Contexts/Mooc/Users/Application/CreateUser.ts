import { UserRepository } from '../Domain/UserRepository';
import { User } from '../Domain/User';
import { UserId } from '../Domain/UserId';
import { UserEmail } from '../Domain/UserEmail';
import { UserPassword } from '../Domain/UserPassword';
import { UserName } from '../Domain/UserName';
import { EventBus } from '../../../Shared/Domain/EventBus';

export class CreateUser {
  constructor(private repository: UserRepository, private eventBus: EventBus) {}

  async run({
    id,
    email,
    password,
    name
  }: {
    id: UserId;
    email: UserEmail;
    password: UserPassword;
    name: UserName;
  }): Promise<void> {
    const user = User.create({ id, email, password, name });

    await this.repository.save(user);

    await this.eventBus.publish(user.pullDomainEvents());
  }
}
