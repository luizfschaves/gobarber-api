import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/user', UserController.store);

routes.use(authMiddleware);

routes.put('/user', UserController.update);

export default routes;
