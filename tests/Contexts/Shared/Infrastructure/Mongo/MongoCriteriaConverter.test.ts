import { MongoCriteriaConverter } from '../../../../../src/Contexts/Shared/Infrastructure/Mongo/MongoCriteriaConverter';
import { Criteria } from '../../../../../src/Contexts/Shared/Domain/Criteria/Criteria';
import { Filters } from '../../../../../src/Contexts/Shared/Domain/Criteria/Filters';
import { Order } from '../../../../../src/Contexts/Shared/Domain/Criteria/Order';

describe('MongoCriteriaConverter', () => {
  const converter = new MongoCriteriaConverter();

  describe('#convert', () => {
    it('convert criteria to mongo filter', () => {
      const filters = Filters.fromValues([
        new Map([
          ['field', 'name'],
          ['operator', '='],
          ['value', 'a']
        ])
      ]);
      const order = Order.fromValues('id', 'asc');
      const criteria = new Criteria(filters, order);
      expect(converter.convert(criteria)).toEqual({ name: { $eq: 'a' } });
    });
  });

  describe('#convertOrder', () => {
    it('order by id asc', () => {
      const order = Order.fromValues('id', 'asc');
      expect(converter.convertOrder(order)).toEqual({ id: 1 });
    });

    it('order by id desc', () => {
      const order = Order.fromValues('id', 'desc');
      expect(converter.convertOrder(order)).toEqual({ id: -1 });
    });
  });
});
