import { Users as User } from '@prisma/client';

export interface AuthInterface {
  findByEmail(userEmail: string): Promise<User | null | undefined>;
}
