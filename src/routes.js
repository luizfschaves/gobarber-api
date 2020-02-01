import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/user', UserController.store);

routes.use(authMiddleware);

routes.put('/user', UserController.update);

routes.post('/files', upload.single('file'), (req, res) =>
	res.json({ ok: true })
);

export default routes;
