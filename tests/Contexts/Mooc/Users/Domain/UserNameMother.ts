import { UserName } from '../../../../../src/Contexts/Mooc/Users/Domain/UserName';
import { WordMother } from '../../../Shared/Domain/WordMother';

export class UserNameMother {
  static create(value: string): UserName {
    return new UserName(value);
  }

  static random(): UserName {
    return this.create(WordMother.random());
  }
}
