import { UserRepository } from '../Domain/UserRepository';
import { UserGithubId } from '../Domain/UserGithubId';
import { Criteria } from '../../../Shared/Domain/Criteria/Criteria';
import { Filters } from '../../../Shared/Domain/Criteria/Filters';
import { Order } from '../../../Shared/Domain/Criteria/Order';
import { UserId } from '../Domain/UserId';
import { UserEmail } from '../Domain/UserEmail';
import { UserName } from '../Domain/UserName';
import { UserPassword } from '../Domain/UserPassword';
import { User } from '../Domain/User';

export class FindUserOrCreate {
  constructor(private repository: UserRepository) {}

  public async run({
    id,
    email,
    name,
    githubId
  }: {
    id: UserId;
    email: UserEmail;
    name: UserName;
    githubId: UserGithubId;
  }) {
    const filters = Filters.fromValues([
      new Map([
        ['field', 'githubId'],
        ['operator', 'CONTAINS'],
        ['value', githubId.toString()]
      ])
    ]);
    const order = Order.fromValues();
    const criteria = new Criteria(filters, order);
    const users = await this.repository.find(criteria);

    if (users.length > 0) return users[0];

    return new User({ id, name, email, githubId, password: new UserPassword('') });
  }
}
