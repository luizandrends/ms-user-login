import { Router } from 'express';

import authRouter from '@modules/auth/infra/http/routes/auth.routes';

const router = Router();

router.use('/users', authRouter);

export default router;
