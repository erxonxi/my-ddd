import { UserId } from '../../../../../src/Contexts/Mooc/Users/Domain/UserId';
import { UuidMother } from '../../../Shared/Domain/UuidMother';

export class UserIdMother {
  static create(value: string): UserId {
    return new UserId(value);
  }

  static random(): UserId {
    return this.create(UuidMother.random());
  }
}
