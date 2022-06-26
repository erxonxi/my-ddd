import { Criteria } from '../../../Shared/Domain/Criteria/Criteria';
import { UserRepository } from '../Domain/UserRepository';
import { User } from '../Domain/User';

export class FindUsersByCriteria {
  constructor(private repository: UserRepository) {}
  public async run(criteria: Criteria): Promise<User[]> {
    return this.repository.find(criteria);
  }
}
