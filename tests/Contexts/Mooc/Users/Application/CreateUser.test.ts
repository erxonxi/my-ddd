import { CreateUser } from '../../../../../src/Contexts/Mooc/Users/Application/CreateUser';
import { UserMother } from '../Domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import EventBusMock from '../../../Shared/__mocks__/EventBusMock';
import { UserGithubId } from '../../../../../src/Contexts/Mooc/Users/Domain/UserGithubId';

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
    user.githubId = new UserGithubId('');

    await usecase.run(user);

    repository.assertLastSavedUserIs(user);
  });
});
