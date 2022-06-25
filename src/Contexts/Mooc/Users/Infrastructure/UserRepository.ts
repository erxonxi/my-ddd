import { User } from '../Domain/User';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { UserId } from '../Domain/UserId';
import { UserEmail } from '../Domain/UserEmail';

export interface UserRepository {
  save(course: User): Promise<void>;
  search(id: UserId): Promise<Nullable<User>>;
  searchByEmail(email: UserEmail): Promise<Nullable<User>>;
  delete(id: UserId): Promise<void>;
  findAll(): Promise<User[]>;
}
