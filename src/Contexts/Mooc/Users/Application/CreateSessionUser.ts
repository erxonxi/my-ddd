import { UserRepository } from '../Domain/UserRepository';
import { UserEmail } from '../Domain/UserEmail';
import { UserPassword } from '../Domain/UserPassword';
import { HashEncrypt } from '../../../Shared/Infrastructure/Encrypt/HashEncrypt';
import { Session } from '../../../Shared/Domain/Auth/Session';

export class CreateSessionUser {
  constructor(private repository: UserRepository, private hashes: HashEncrypt) {}

  async run({ email, password }: { email: UserEmail; password: UserPassword }): Promise<Session> {
    const user = await this.repository.searchByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const verify = await this.hashes.compare(password.value.toString(), user.password.toString());
    if (!verify) {
      throw new Error('Invalid credentials');
    }

    return {
      user: {
        id: user.id.toString(),
        name: user.name.toString(),
        email: user.email.toString()
      }
    };
  }
}
