import { Users as User } from '@prisma/client';

import { prisma } from '@shared/infra/database';

import { AuthInterface } from '@modules/auth/interfaces/AuthInterface';

class AuthRepository implements AuthInterface {
  public async findByEmail(
    userEmail: string
  ): Promise<User | null | undefined> {
    const findUser = await prisma.users.findUnique({
      where: { email: userEmail },
    });

    return findUser;
  }
}

export default AuthRepository;
