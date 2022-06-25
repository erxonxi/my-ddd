import { UserMother } from '../Domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { DeleteUser } from '../../../../../src/Contexts/Mooc/Users/Application/DeleteUser';

let repository: UserRepositoryMock;
let usecase: DeleteUser;

beforeEach(() => {
  repository = new UserRepositoryMock();
  usecase = new DeleteUser(repository);
});

describe('DeleteUser', () => {
  it('should delete a existent User', async () => {
    const user = UserMother.random();
    await repository.save(user);

    await usecase.run(user.id);

    const userInDb = await repository.search(user.id);
    expect(userInDb).toEqual(undefined);
  });
});
