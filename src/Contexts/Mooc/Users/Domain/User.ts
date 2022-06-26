import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { UserPassword } from './UserPassword';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserId } from './UserId';
import { UserCreatedDomainEvent } from './Events/UserCreatedDomainEvent';

export class User extends AggregateRoot {
  id: UserId;
  email: UserEmail;
  password: UserPassword;
  name: UserName;

  constructor({ id, email, password, name }: { id: UserId; email: UserEmail; password: UserPassword; name: UserName }) {
    super();
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
  }

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
    const user = new User({
      id,
      email,
      password,
      name
    });

    user.record(new UserCreatedDomainEvent({ id: id.toString(), email: email.toString(), name: name.toString() }));

    return user;
  }

  static fromPrimitives(plainData: { id: string; email: string; password: string; name: string }): User {
    return new User({
      id: new UserId(plainData.id),
      email: new UserEmail(plainData.email),
      password: new UserPassword(plainData.password),
      name: new UserName(plainData.name)
    });
  }

  toPrimitives(show_password = true) {
    return {
      id: this.id.value,
      email: this.email.value,
      password: show_password ? this.password.value : null,
      name: this.name.value
    };
  }
}
