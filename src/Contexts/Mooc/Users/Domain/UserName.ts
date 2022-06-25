import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgumentError';
import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';

export class UserName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureNotLenghtThan20(value);
  }

  private ensureNotLenghtThan20(value: string): void {
    if (value.length > 20) {
      throw new InvalidArgumentError(`Name can't include more than 20 characters: ${value}`);
    }
  }
}
