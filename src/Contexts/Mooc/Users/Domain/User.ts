import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { UserPassword } from './UserPassword';
import { UserEmail } from './UserEmail';
import { UserName } from './UserName';
import { UserId } from './UserId';
import { UserCreatedDomainEvent } from './Events/UserCreatedDomainEvent';
import { UserGithubId } from './UserGithubId';

export class User extends AggregateRoot {
  id: UserId;
  email: UserEmail;
  password: UserPassword;
  name: UserName;
  githubId: UserGithubId;

  constructor({
    id,
    email,
    password,
    name,
    createdAt,
    githubId
  }: {
    id: UserId;
    email: UserEmail;
    password: UserPassword;
    name: UserName;
    createdAt?: Date;
    githubId: UserGithubId;
  }) {
    super({ createdAt });
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.githubId = githubId;
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
      name,
      githubId: new UserGithubId('')
    });

    user.record(new UserCreatedDomainEvent({ id: id.toString(), email: email.toString(), name: name.toString() }));

    return user;
  }

  static fromPrimitives(plainData: {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt?: string;
    githubId?: string;
  }): User {
    return new User({
      id: new UserId(plainData.id),
      email: new UserEmail(plainData.email),
      password: new UserPassword(plainData.password),
      name: new UserName(plainData.name),
      createdAt: plainData.createdAt ? new Date(plainData.createdAt) : new Date(),
      githubId: plainData.githubId ? new UserGithubId(plainData.githubId) : new UserGithubId('')
    });
  }

  toPrimitives(showPassword = true, showCreatedAt = true, showGithubId = true) {
    return {
      id: this.id.value,
      email: this.email.value,
      password: showPassword ? this.password.value : null,
      name: this.name.value,
      createdAt: showCreatedAt ? this.createdAt.toISOString() : null,
      githubId: showGithubId ? this.githubId.value : null
    };
  }
}
