import { Response, Controller, Put, Params, Body, Delete, Post } from '@decorators/express';
import { Response as IResponse } from 'express';
import container from '../Injections';
import { CreateUser } from '../../../Contexts/Mooc/Users/Application/CreateUser';
import { UserId } from '../../../Contexts/Mooc/Users/Domain/UserId';
import { UserEmail } from '../../../Contexts/Mooc/Users/Domain/UserEmail';
import { UserPassword } from '../../../Contexts/Mooc/Users/Domain/UserPassword';
import { UserName } from '../../../Contexts/Mooc/Users/Domain/UserName';
import { DeleteUser } from '../../../Contexts/Mooc/Users/Application/DeleteUser';
import { FindUsersByCriteria } from '../../../Contexts/Mooc/Users/Application/FindUsersByCriteria';
import { Criteria } from '../../../Contexts/Shared/Domain/Criteria/Criteria';
import { Filters } from '../../../Contexts/Shared/Domain/Criteria/Filters';
import { Order } from '../../../Contexts/Shared/Domain/Criteria/Order';

@Controller('/users')
export class UsersController {
  @Put('/:id')
  public async createUser(@Response() res: IResponse, @Params() params: any, @Body() body: any) {
    const usecase = container.get('Mooc.Users.CreateUser') as CreateUser;
    try {
      await usecase.run({
        id: new UserId(params.id.toString()),
        email: new UserEmail(body.email.toString()),
        password: new UserPassword(body.password.toString()),
        name: new UserName(body.name.toString())
      });
      res.status(201).send();
    } catch (e: any) {
      res.status(500).send({ message: e.message });
    }
  }

  @Delete('/:id')
  public async deleteUser(@Response() res: IResponse, @Params() params: any) {
    const usecase = container.get('Mooc.Users.DeleteUser') as DeleteUser;
    try {
      await usecase.run(new UserId(params.id.toString()));
      res.status(200).send();
    } catch (e: any) {
      res.status(500).send({ message: e.message });
    }
  }

  @Post('/criteria')
  public async findUsersByCriteria(@Response() res: IResponse, @Body() body: any) {
    const usecase = container.get('Mooc.Users.FindUsersByCriteria') as FindUsersByCriteria;
    try {
      const filters = Filters.fromValues(body.filters?.map((filter: any) => new Map(filter)));
      const order = Order.fromValues(body.order);
      const criteria = new Criteria(filters, order);

      const users = await usecase.run(criteria);

      res.status(200).send(users.map(u => u.toPrimitives()));
    } catch (e: any) {
      res.status(500).send({ message: e.message });
    }
  }
}
