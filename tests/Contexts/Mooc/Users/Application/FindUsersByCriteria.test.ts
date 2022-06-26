/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserMother } from '../Domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { FindUsersByCriteria } from '../../../../../src/Contexts/Mooc/Users/Application/FindUsersByCriteria';
import { Criteria } from '../../../../../src/Contexts/Shared/Domain/Criteria/Criteria';
import { Filters } from '../../../../../src/Contexts/Shared/Domain/Criteria/Filters';
import { Order } from '../../../../../src/Contexts/Shared/Domain/Criteria/Order';
import { UserName } from '../../../../../src/Contexts/Mooc/Users/Domain/UserName';

let repository: UserRepositoryMock;
let usecase: FindUsersByCriteria;

beforeEach(async () => {
  repository = new UserRepositoryMock();
  usecase = new FindUsersByCriteria(repository);

  [...Array(10).keys()].map(async _i => {
    const user = UserMother.random();
    await repository.save(user);
  });

  [...Array(6).keys()].map(async _i => {
    const user = UserMother.random();
    user.name = new UserName('Pepe');
    await repository.save(user);
  });
});

describe('FindUsersByCriteria', () => {
  it('find all users', async () => {
    const filters = Filters.fromValues([]);
    const order = Order.fromValues();
    const users = await usecase.run(new Criteria(filters, order));

    expect(users.length).toEqual(16);
  });

  it('find users equal name', async () => {
    const filters = Filters.fromValues([
      new Map([
        ['field', 'name'],
        ['operator', '='],
        ['value', 'Pepe']
      ])
    ]);
    const order = Order.fromValues();
    const users = await usecase.run(new Criteria(filters, order));

    expect(users.length).toEqual(6);
  });
});
