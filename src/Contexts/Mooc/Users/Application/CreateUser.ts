import { UserRepository } from '../Domain/UserRepository';
import { User } from '../Domain/User';
import { UserId } from '../Domain/UserId';
import { UserEmail } from '../Domain/UserEmail';
import { UserPassword } from '../Domain/UserPassword';
import { UserName } from '../Domain/UserName';
import { EventBus } from '../../../Shared/Domain/EventBus';
import { HashEncrypt } from '../../../Shared/Infrastructure/Encrypt/HashEncrypt';

export class CreateUser {
  constructor(private repository: UserRepository, private eventBus: EventBus, private hasher: HashEncrypt) {}

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
    const passwordHashed = await this.hasher.hash(password.value);
    const user = User.create({ id, email, password: new UserPassword(passwordHashed), name });

    await this.repository.save(user);

    await this.eventBus.publish(user.pullDomainEvents());
  }
}
