import { CreateUser } from '../../../../../src/Contexts/Mooc/Users/Application/CreateUser';
import { UserMother } from '../Domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import EventBusMock from '../../../Shared/__mocks__/EventBusMock';
import { HashEncrypt } from '../../../../../src/Contexts/Shared/Infrastructure/Encrypt/HashEncrypt';
import { UserPassword } from '../../../../../src/Contexts/Mooc/Users/Domain/UserPassword';

let eventBus: EventBusMock;
let repository: UserRepositoryMock;
let hasher: HashEncrypt;
let usecase: CreateUser;

beforeEach(() => {
  eventBus = new EventBusMock();
  repository = new UserRepositoryMock();
  hasher = new HashEncrypt();
  usecase = new CreateUser(repository, eventBus, hasher);
});

describe('CreateUser', () => {
  it('should create a valid User', async () => {
    const user = UserMother.random();

    await usecase.run(user);

    const passwordHashed = await hasher.hash(user.password.value);
    user.password = new UserPassword(passwordHashed);
    repository.assertLastSavedUserIs(user);
  });
});
