import { Response, Controller, Put, Params, Body } from '@decorators/express';
import { Response as IResponse } from 'express';
import container from '../Injections';
import { CreateUser } from '../../../Contexts/Mooc/Users/Application/CreateUser';
import { UserId } from '../../../Contexts/Mooc/Users/Domain/UserId';
import { UserEmail } from '../../../Contexts/Mooc/Users/Domain/UserEmail';
import { UserPassword } from '../../../Contexts/Mooc/Users/Domain/UserPassword';
import { UserName } from '../../../Contexts/Mooc/Users/Domain/UserName';

@Controller('/users')
export class UsersController {
  @Put('/:id')
  public async put(@Response() res: IResponse, @Params() params: any, @Body() body: any) {
    const creator = container.get('Mooc.Users.CreateUser') as CreateUser;
    try {
      await creator.run({
        id: new UserId(params.id.toString()),
        email: new UserEmail(body.email.toString()),
        password: new UserPassword(body.password.toString()),
        name: new UserName(body.name.toString())
      });
      res.status(201).send();
    } catch (e: any) {
      console.log(e);
      res.status(500).send({ message: e.message });
    }
  }
}
