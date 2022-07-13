import AppError from '@shared/errors/AppError';
import FakeAuthRepository from '../interfaces/fakes/FakeAuthRepository';
import FakeBCryptHashProvider from '../providers/BCryptHashProvider/fakes/FakeBCryptHashProvider';
import AuthUserService from './AuthUserService';

let fakeAuthRepository: FakeAuthRepository;
let fakeBCryptHashProvider: FakeBCryptHashProvider;
let authUserService: AuthUserService;

describe('AuthUserService', () => {
  beforeEach(() => {
    fakeAuthRepository = new FakeAuthRepository();
    fakeBCryptHashProvider = new FakeBCryptHashProvider();

    authUserService = new AuthUserService(
      fakeAuthRepository,
      fakeBCryptHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const userData = {
      email: 'johndoe@example.com',
      password: '123456',
    };

    const response = await authUserService.execute(userData);

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate an unexistent user', async () => {
    const userData = {
      email: 'unexistent@example.com',
      password: '123456',
    };

    await expect(authUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should not be able to authenticate with a wrong password', async () => {
    const userData = {
      email: 'johndoe@example.com',
      password: 'wrong-password',
    };

    await expect(authUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
