import { User } from './User';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { UserId } from './UserId';
import { UserEmail } from './UserEmail';
import { Criteria } from '../../../Shared/Domain/Criteria/Criteria';

export interface UserRepository {
  save(course: User): Promise<void>;
  search(id: UserId): Promise<Nullable<User>>;
  searchByEmail(email: UserEmail): Promise<Nullable<User>>;
  delete(id: UserId): Promise<void>;
  findAll(): Promise<User[]>;
  find(criteria: Criteria): Promise<User[]>;
}
