import { Collection, MongoClient } from 'mongodb';
import { AggregateRoot } from '../../Domain/AggregateRoot';
import { Criteria } from '../../Domain/Criteria/Criteria';
import { MongoCriteriaConverter } from './MongoCriteriaConverter';

export abstract class MongoRepository<T extends AggregateRoot> {
  constructor(private _client: Promise<MongoClient>, private criteriaConverter: MongoCriteriaConverter<any>) {}

  protected abstract moduleName(): string;

  protected client(): Promise<MongoClient> {
    return this._client;
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.moduleName());
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection();

    const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined };

    await collection.updateOne({ _id: id }, { $set: document }, { upsert: true });
  }

  public async findByCriteria(criteria: Criteria): Promise<any[]> {
    const collection = await this.collection();
    const filter = this.criteriaConverter.convert(criteria);
    if (criteria.order.hasOrder()) {
      return await collection.find(filter).sort(this.criteriaConverter.convertOrder(criteria.order)).toArray();
    } else {
      return await collection.find(filter).toArray();
    }
  }
}
