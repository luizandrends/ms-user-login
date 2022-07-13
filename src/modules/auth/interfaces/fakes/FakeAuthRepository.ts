import { Users as User } from '@prisma/client';

import { AuthInterface } from '../AuthInterface';

class FakeAuthRepository implements AuthInterface {
  private users: User[] = [
    {
      id: '62ce0912ea2d703e8ebb57d1',
      email: 'johndoe@example.com',
      password: '123456',
      userRegisterDbId: '62ce09a52eb3082797917f45',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  public async findByEmail(
    userEmail: string
  ): Promise<User | null | undefined> {
    const findUser = this.users.find(user => user.email === userEmail);

    return findUser;
  }
}

export default FakeAuthRepository;
