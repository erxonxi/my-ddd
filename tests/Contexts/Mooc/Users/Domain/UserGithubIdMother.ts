import { UserGithubId } from '../../../../../src/Contexts/Mooc/Users/Domain/UserGithubId';
import { WordMother } from '../../../Shared/Domain/WordMother';

export class UserGithubIdMother {
  static create(value: string): UserGithubId {
    return new UserGithubId(value);
  }

  static random(): UserGithubId {
    return this.create(WordMother.random());
  }
}
