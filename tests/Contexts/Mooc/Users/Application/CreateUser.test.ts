import { CreateUser } from '../../../../../src/Contexts/Mooc/Users/Application/CreateUser';
import { UserMother } from '../Domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import EventBusMock from '../../../Shared/__mocks__/EventBusMock';

let eventBus: EventBusMock;
let repository: UserRepositoryMock;
let usecase: CreateUser;

beforeEach(() => {
  eventBus = new EventBusMock();
  repository = new UserRepositoryMock();
  usecase = new CreateUser(repository, eventBus);
});

describe('CreateUser', () => {
  it('should create a valid User', async () => {
    const user = UserMother.random();

    await usecase.run(user);

    repository.assertLastSavedUserIs(user);
  });
});
