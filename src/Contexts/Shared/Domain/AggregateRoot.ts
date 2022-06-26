import { DomainEvent } from './DomainEvent';

export abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent>;
  readonly createdAt: Date;

  protected constructor({ createdAt }: { createdAt?: Date }) {
    this.createdAt = createdAt || new Date();
    this.domainEvents = [];
  }

  pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  abstract toPrimitives(): any;
}
