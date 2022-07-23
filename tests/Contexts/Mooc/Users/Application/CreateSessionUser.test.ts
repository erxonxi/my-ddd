import { UserMother } from '../Domain/UserMother';
import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { HashEncrypt } from '../../../../../src/Contexts/Shared/Infrastructure/Encrypt/HashEncrypt';
import { UserPassword } from '../../../../../src/Contexts/Mooc/Users/Domain/UserPassword';
import { CreateSessionUser } from '../../../../../src/Contexts/Mooc/Users/Application/CreateSessionUser';

let repository: UserRepositoryMock;
let hasher: HashEncrypt;
let usecase: CreateSessionUser;

beforeEach(() => {
  repository = new UserRepositoryMock();
  hasher = new HashEncrypt();
  usecase = new CreateSessionUser(repository, hasher);
});

describe('GIVEN create session of nonexistent user', () => {
  const user = UserMother.random();
  const password = user.password;

  describe('WHEN the email and password is incorrect', () => {
    it('THEN the "Invalid credentials" is threw ', async () => {
      await expect(usecase.run({ email: user.email, password })).rejects.toThrow('Invalid credentials');
    });
  });
});

describe('GIVEN create session of existent user', () => {
  const user = UserMother.random();
  const password = user.password;

  beforeEach(async () => {
    const passwordHashed = await hasher.hash(user.password.value);
    user.password = new UserPassword(passwordHashed);
    await repository.save(user);
  });

  describe('WHEN the email and password is correct', () => {
    it('THEN the return is a session ', async () => {
      const session = await usecase.run({ email: user.email, password });
      expect(session.user.id).toBe(user.id.toString());
      expect(session.user.name).toBe(user.name.toString());
      expect(session.user.email).toBe(user.email.toString());
    });
  });
});
