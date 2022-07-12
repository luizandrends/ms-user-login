import { Router } from 'express';

import AuthUserController from '../controllers/AuthUserController';

const authUserController = new AuthUserController();

const authRouter = Router();

authRouter.post('/authenticate', authUserController.create);

export default authRouter;
