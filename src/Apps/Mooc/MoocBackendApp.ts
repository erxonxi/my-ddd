import { Server } from './Server';
import container from './Injections';
import { EventBus } from '../../Contexts/Shared/Domain/EventBus';
import { DomainEventSubscriber } from '../../Contexts/Shared/Domain/DomainEventSubscriber';
import { Definition } from 'node-dependency-injection';
import { DomainEvent } from '../../Contexts/Shared/Domain/DomainEvent';
import { DomainEventMapping } from '../../Contexts/Shared/Infrastructure/EventBus/DomainEventMapping';

export class MoocBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    await this.registerSubscribers();
    return this.server.listen();
  }

  async stop() {
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  private async registerSubscribers() {
    const eventBus = container.get('Shared.EventBus') as EventBus;
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<string, Definition>;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
    const domainEventMapping = new DomainEventMapping(subscribers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(subscribers);
    await eventBus.start();
  }
}
