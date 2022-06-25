import { UserEmail } from '../../../../../src/Contexts/Mooc/Users/Domain/UserEmail';
import { WordMother } from '../../../Shared/Domain/WordMother';

export class UserEmailMother {
  static create(value: string): UserEmail {
    return new UserEmail(value);
  }

  static random(): UserEmail {
    return this.create([WordMother.random(), '@mail.com'].join());
  }
}
