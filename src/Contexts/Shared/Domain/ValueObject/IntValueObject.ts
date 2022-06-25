import { InvalidArgumentError } from './InvalidArgumentError';

export abstract class NumberValueObject {
  readonly value: number;

  constructor(value: number) {
    this.value = value;
    this.checkIsNumber();
  }

  checkIsNumber(): void {
    if (typeof this.value != 'number') {
      throw new InvalidArgumentError('Invalid number');
    }
  }

  equalsTo(other: NumberValueObject): boolean {
    return this.value === other.value;
  }

  isBiggerThan(other: NumberValueObject): boolean {
    return this.value > other.value;
  }
}
