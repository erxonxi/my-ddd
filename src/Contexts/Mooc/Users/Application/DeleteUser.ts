import { UserRepository } from '../Domain/UserRepository';
import { UserId } from '../Domain/UserId';

export class DeleteUser {
  constructor(private repository: UserRepository) {}

  public async run(id: UserId) {
    await this.repository.delete(id);
  }
}
