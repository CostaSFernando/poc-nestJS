import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Iuser } from '../../interfaces/Iuser.model';

@Injectable()
export class UsersService {
  private users: Iuser[] = [
      {id: 1, name: 'Fernando'},
      {id: 2, name: 'wilker'}
  ];

  public getUsers(): Iuser[] {
    return this.users;
  }

  public getUser(id: number) {
    return this.users.find((iUser) => iUser.id === id);
  }

  public createdUser(user: Iuser): Iuser {
    const finalId = this.users.reduce(
      (acc, cur) => (acc < cur.id ? cur.id : acc),
      0,
    );
    user = { name: user.name, id: finalId + 1 };
    this.users.push(user);
    return user;
  }

  public updateUser({ id, ...userWithoutId }: Iuser) {
    let original = this.users.find((iUser) => iUser.id === id);
    if(!original) {
        throw new Error("Usuario não encontrado!");
    }

    Object.assign(original, userWithoutId);

    return original;
  }

  public deleteUser(id: number) {
    const valueInitial = this.users.length;
    this.users = this.users.filter(us => us.id !== id)

    if (!(this.users.length - valueInitial)) {
        throw new HttpException('Usuario não encontrado.', HttpStatus.NOT_FOUND);
    }

    return 'Usuario excluido com sucesso!';

  }
}
