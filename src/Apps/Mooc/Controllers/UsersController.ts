import { Response, Controller, Put, Params, Body, Delete } from '@decorators/express';
import { Response as IResponse } from 'express';
import container from '../Injections';
import { CreateUser } from '../../../Contexts/Mooc/Users/Application/CreateUser';
import { UserId } from '../../../Contexts/Mooc/Users/Domain/UserId';
import { UserEmail } from '../../../Contexts/Mooc/Users/Domain/UserEmail';
import { UserPassword } from '../../../Contexts/Mooc/Users/Domain/UserPassword';
import { UserName } from '../../../Contexts/Mooc/Users/Domain/UserName';
import { DeleteUser } from '../../../Contexts/Mooc/Users/Application/DeleteUser';

@Controller('/users')
export class UsersController {
  @Put('/:id')
  public async put(@Response() res: IResponse, @Params() params: any, @Body() body: any) {
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
  public async delete(@Response() res: IResponse, @Params() params: any) {
    const usecase = container.get('Mooc.Users.DeleteUser') as DeleteUser;
    try {
      await usecase.run(new UserId(params.id.toString()));
      res.status(200).send();
    } catch (e: any) {
      res.status(500).send({ message: e.message });
    }
  }
}
