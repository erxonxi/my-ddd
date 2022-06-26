import { MongoRepository } from '../../../Shared/Infrastructure/Mongo/MongoRepository';
import { User } from '../Domain/User';
import { UserId } from '../Domain/UserId';
import { UserRepository } from '../Domain/UserRepository';
import { Nullable } from '../../../Shared/Domain/Nullable';
import { UserEmail } from '../Domain/UserEmail';
import { Criteria } from '../../../Shared/Domain/Criteria/Criteria';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {
  public save(course: User): Promise<void> {
    return this.persist(course.id.value, course);
  }

  public async search(id: UserId): Promise<Nullable<User>> {
    const collection = await this.collection();
    const document: any = await collection.findOne({ _id: id.value });

    return document ? User.fromPrimitives({ ...document, id: id.value }) : null;
  }

  public async searchByEmail(email: UserEmail): Promise<Nullable<User>> {
    const collection = await this.collection();
    const document: any = await collection.findOne({ email: email.value });

    return document ? User.fromPrimitives({ ...document, id: String(document._id) }) : null;
  }

  public async delete(id: UserId): Promise<void> {
    const collection = await this.collection();
    await collection.deleteOne({ _id: id.value });
  }

  public async findAll(): Promise<User[]> {
    const collection = await this.collection();
    const res = await collection.find().toArray();
    return res.map((document: any) => User.fromPrimitives({ ...document, id: String(document._id) }));
  }

  public async find(criteria: Criteria): Promise<User[]> {
    const res = await this.findByCriteria(criteria);
    return res.map((document: any) => User.fromPrimitives({ ...document, id: String(document._id) }));
  }

  protected moduleName(): string {
    return 'users';
  }
}
