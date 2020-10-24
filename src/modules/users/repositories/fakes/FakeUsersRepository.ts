import { uuid } from 'uuidv4';

import iUserRepository from '@modules/users/repositories/IUsersRepository';
import iCreateUsersDTO from '@modules/users/dtos/iCreateUsersDTO';

import User from '../../infra/typeorm/entities/User';

class FakeUserRepository implements iUserRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create({
    name,
    email,
    password,
  }: iCreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, { name, email, password });

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findByIndex = this.users.findIndex(
      userIndex => userIndex.id === user.id,
    );

    this.users[findByIndex] = user;

    return user;
  }
}

export default FakeUserRepository;
