import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthUserService from '@modules/auth/services/AuthUserService';

class AuthUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authUserService = container.resolve(AuthUserService);

    const authenticateUser = await authUserService.execute({
      email,
      password,
    });

    return response.json(authenticateUser);
  }
}

export default AuthUserController;
