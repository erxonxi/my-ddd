import { User } from '../../../../../src/Contexts/Mooc/Users/Domain/User';
import { UserEmail } from '../../../../../src/Contexts/Mooc/Users/Domain/UserEmail';
import { UserId } from '../../../../../src/Contexts/Mooc/Users/Domain/UserId';
import { UserRepository } from '../../../../../src/Contexts/Mooc/Users/Domain/UserRepository';
import { Nullable } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { Criteria } from '../../../../../src/Contexts/Shared/Domain/Criteria/Criteria';
import { CriteriaConverterArray } from '../../../Shared/Infrastructure/CriteriaConverterArray';

export class UserRepositoryMock implements UserRepository {
  private mockSave = jest.fn();
  private mockSearch = jest.fn();
  private mockSearchByEmail = jest.fn();
  private fakeDb: User[] = [];

  async save(user: User): Promise<void> {
    this.mockSave(user);

    this.fakeDb.filter((userDb, index) => {
      if (userDb.id.value === user.id.value) {
        delete this.fakeDb[index];
      }
    });

    this.fakeDb.push(user);
  }

  assertLastSavedUserIs(expected: User): void {
    const mock = this.mockSave.mock;
    const lastSavedUser = mock.calls[mock.calls.length - 1][0] as User;
    expect(lastSavedUser).toBeInstanceOf(User);
    expect(lastSavedUser.toPrimitives(false, false, false)).toEqual(expected.toPrimitives(false, false, false));
  }

  async search(id: UserId): Promise<Nullable<User>> {
    this.mockSearch(id);
    const res = this.fakeDb.filter(user => user.id.value === id.value);
    return res[0];
  }

  async searchByEmail(email: UserEmail): Promise<User> {
    this.mockSearchByEmail(email);
    const res = this.fakeDb.filter(user => user.email.value === email.value);
    return res[0];
  }

  async delete(id: UserId): Promise<void> {
    this.mockSearch(id);
    this.fakeDb.filter((userDb, index) => {
      if (userDb.id.value === id.value) {
        delete this.fakeDb[index];
      }
    });
  }

  public async findAll(): Promise<User[]> {
    return this.fakeDb;
  }

  public async find(criteria: Criteria): Promise<User[]> {
    return CriteriaConverterArray.filter(this.fakeDb, criteria);
  }

  whenSearchThenReturn(value: Nullable<User>): void {
    this.mockSearch.mockReturnValue(value);
  }

  assertLastSearchedUserIs(expected: UserId): void {
    expect(this.mockSearch).toHaveBeenCalledWith(expected);
  }
}
