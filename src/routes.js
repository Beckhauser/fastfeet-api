import { Router } from 'express';

import authMiddleware  from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.get('/', RecipientController.store);
routes.put('/recipients', RecipientController.update);

routes.post('/users', UserController.store);

export default routes;
