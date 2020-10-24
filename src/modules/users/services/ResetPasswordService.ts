import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

// import User from '@modules/users/infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/iHashProvider';
import iUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/iUserTokenRepository';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: iUserRepository,

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppError('Token Expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
