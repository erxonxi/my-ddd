import { Operator } from '../../../../src/Contexts/Shared/Domain/Criteria/FilterOperator';
import { Criteria } from '../../../../src/Contexts/Shared/Domain/Criteria/Criteria';

export class CriteriaConverterArray {
  static filter(array: any[], criteria: Criteria) {
    return array.filter(obj => {
      const conditions: boolean[] = [];
      const objPrimitives: any = obj.toPrimitives();
      criteria.filters.filters.map(filter => {
        switch (filter.operator.value.toString()) {
          case Operator.EQUAL:
            conditions.push(objPrimitives[filter.field.toString()] === filter.value.toString());
            return;
          case Operator.NOT_EQUAL:
            conditions.push(objPrimitives[filter.field.toString()] !== filter.value.toString());
            return;
          case Operator.GT:
            conditions.push(objPrimitives[filter.field.toString()] >= filter.value.toString());
            return;
          case Operator.LT:
            conditions.push(objPrimitives[filter.field.toString()] <= filter.value.toString());
            return;
          case Operator.CONTAINS:
            conditions.push(String(objPrimitives[filter.field.toString()]).includes(filter.value.toString()));
            return;
          case Operator.NOT_CONTAINS:
            conditions.push(!String(objPrimitives[filter.field.toString()]).includes(filter.value.toString()));
            return;
        }
      });
      return conditions.every(e => e);
    });
  }
}
