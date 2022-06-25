import { MotherCreator } from './MotherCreator';

export class FloatMother {
  static random(max?: number): number {
    return MotherCreator.random().datatype.float(max);
  }
}
