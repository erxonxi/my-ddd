import { CreateUser } from '../../../../../src/Contexts/Mooc/Users/Application/CreateUser';
import { UserMother } from '../Domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';

let repository: UserRepositoryMock;
let usecase: CreateUser;

beforeEach(() => {
  repository = new UserRepositoryMock();
  usecase = new CreateUser(repository);
});

describe('CreateUser', () => {
  it('should create a valid User', async () => {
    const user = UserMother.random();

    await usecase.run(user);

    repository.assertLastSavedUserIs(user);
  });
});
