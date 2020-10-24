import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';

import iMailProvider from '@shared/container/providers/MailPRovider/models/iMailProvider';
import AppError from '@shared/errors/AppError';
import iUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/iUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: iUserRepository,

    @inject('MailProvider')
    private mailProvider: iMailProvider,

    @inject('UserTokenRepository')
    private userTokensRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (!emailExists) {
      throw new AppError('User does not exists.');
    }

    await this.userTokensRepository.generate(emailExists.id);

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido!',
    );
  }
}

export default SendForgotPasswordEmailService;