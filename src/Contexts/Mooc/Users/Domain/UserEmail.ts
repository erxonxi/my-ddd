import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgumentError';
import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';

export class UserEmail extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.validateIsEmail(value);
  }

  private validateIsEmail = (value: string): void => {
    if (value.length > 30) {
      throw new InvalidArgumentError(`Invalid email: ${value}`);
    }
  };
}
