import { DomainEvent } from '../../../../Shared/Domain/DomainEvent';

type CreateUserDomainEventBody = {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly eventName: string;
  readonly occurredOn: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'users.user_created';

  readonly email: string;
  readonly name: string;

  constructor({
    id,
    email,
    name,
    eventId,
    occurredOn
  }: {
    id: string;
    email: string;
    name: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super(UserCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.email = email;
    this.name = name;
  }

  toPrimitive(): CreateUserDomainEventBody {
    const { email, name, aggregateId, occurredOn } = this;
    return {
      email,
      name,
      eventName: UserCreatedDomainEvent.EVENT_NAME,
      id: aggregateId,
      occurredOn: occurredOn.toLocaleString()
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateUserDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new UserCreatedDomainEvent({
      id: aggregateId,
      email: body.email,
      name: body.name,
      eventId,
      occurredOn
    });
  }
}
