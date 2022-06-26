import { Filter as MongoFilter } from 'mongodb';
import { Filter } from '../../Domain/Criteria/Filter';
import { Criteria } from '../../Domain/Criteria/Criteria';
import { Operator } from '../../Domain/Criteria/FilterOperator';
import { Order } from '../../Domain/Criteria/Order';

export class MongoCriteriaConverter<TSchema> {
  public convert(criteria: Criteria): MongoFilter<TSchema> {
    let filter = {};

    criteria.filters.filters.map(e => {
      filter = { ...filter, ...MongoCriteriaConverter.convertFilter(e) };
    });

    return filter;
  }

  private static convertFilter(filter: Filter) {
    const map = new Map([
      [Operator.EQUAL, { [String(filter.field)]: { $eq: filter.value.toString() } }],
      [Operator.NOT_EQUAL, { [String(filter.field)]: { $ne: filter.value.toString() } }],
      [Operator.GT, { [String(filter.field)]: { $gt: filter.value.toString() } }],
      [Operator.LT, { [String(filter.field)]: { $lt: filter.value.toString() } }],
      [Operator.CONTAINS, { [String(filter.field)]: { $regex: `${filter.value.toString()}` } }],
      [Operator.NOT_CONTAINS, { [String(filter.field)]: { $not: { $regex: `${filter.value.toString()}` } } }]
    ]);
    return map.get(filter.operator.value);
  }

  public convertOrder(order: Order): { [x: string]: 1 | -1 } {
    return { [order.orderBy.toString()]: order.orderType.isAsc() ? 1 : -1 };
  }
}
