import { Router } from 'express';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.get('/', RecipientController.store);
routes.post('/users', UserController.store);

export default routes;
