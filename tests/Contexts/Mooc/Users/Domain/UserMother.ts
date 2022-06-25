import { UserId } from '../../../../../src/Contexts/Mooc/Users/Domain/UserId';
import { UserEmail } from '../../../../../src/Contexts/Mooc/Users/Domain/UserEmail';
import { UserPassword } from '../../../../../src/Contexts/Mooc/Users/Domain/UserPassword';
import { UserName } from '../../../../../src/Contexts/Mooc/Users/Domain/UserName';
import { User } from '../../../../../src/Contexts/Mooc/Users/Domain/User';
import { UserIdMother } from './UserIdMother';
import { UserEmailMother } from './UserEmailMother';
import { UserPasswordMother } from './ UserPasswordMother';
import { UserNameMother } from './UserNameMother';

export class UserMother {
  static create({
    id,
    email,
    password,
    name
  }: {
    id: UserId;
    email: UserEmail;
    password: UserPassword;
    name: UserName;
  }): User {
    return new User({
      id,
      email,
      password,
      name
    });
  }

  static random(): User {
    return this.create({
      id: UserIdMother.random(),
      email: UserEmailMother.random(),
      password: UserPasswordMother.random(),
      name: UserNameMother.random()
    });
  }
}
