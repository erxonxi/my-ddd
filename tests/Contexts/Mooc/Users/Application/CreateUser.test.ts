import { CreateUser } from '../../../../../src/Contexts/Mooc/Users/Application/CreateUser';
import { UserMother } from '../Domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';

let repository: UserRepositoryMock;
let creator: CreateUser;

beforeEach(() => {
  repository = new UserRepositoryMock();
  creator = new CreateUser(repository);
});

describe('CreateUser', () => {
  it('should create a valid User', async () => {
    const user = UserMother.random();

    await creator.run(user);

    repository.assertLastSavedUserIs(user);
  });
});
