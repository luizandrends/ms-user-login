import { container } from 'tsyringe';

import '@modules/auth/providers';

import { AuthInterface } from '@modules/auth/interfaces/AuthInterface';
import AuthRepository from '@modules/auth/infra/database/repositories/AuthRepository';

container.registerSingleton<AuthInterface>('AuthRepository', AuthRepository);
