import { inject, injectable } from 'tsyringe';
import { Users as User } from '@prisma/client';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

import { AuthInterface } from '../interfaces/AuthInterface';
import { AuthDTO } from '../dtos/AuthDTO';

import { BCryptHashProviderInterface } from '../providers/BCryptHashProvider/interfaces/BCryptHashProviderInterface';

interface ResponseData {
  user: User;
  token: string;
}

@injectable()
class AuthUserService {
  constructor(
    @inject('AuthRepository')
    private authRepository: AuthInterface,

    @inject('HashProvider')
    private hashProvider: BCryptHashProviderInterface
  ) {}

  public async execute(authData: AuthDTO): Promise<ResponseData> {
    const { email, password } = authData;

    const findUserByEmail = await this.authRepository.findByEmail(email);

    if (!findUserByEmail) {
      throw new AppError('Invalid user or password', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      findUserByEmail.password
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: findUserByEmail.id,
      expiresIn,
    });

    return {
      user: findUserByEmail,
      token,
    };
  }
}

export default AuthUserService;
