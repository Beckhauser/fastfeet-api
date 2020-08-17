import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import OrderController from './app/controllers/OrderController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.createNewSession);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.listAllRecipients);
routes.post('/recipients', RecipientController.createRecipient);
routes.put('/recipients/:id', RecipientController.updateRecipient);

routes.get('/deliveryman', DeliverymanController.listAllDeliveryman);
routes.post('/deliveryman', DeliverymanController.createDeliveryman);
routes.put('/deliveryman/:id', DeliverymanController.updateDeliveryman);
routes.delete('/deliveryman/:id', DeliverymanController.deleteDeliveryman);

routes.get('/delivery/', DeliveryController.listAllDelivery);
routes.post('/delivery', DeliveryController.createDelivery);
routes.put('/delivery/:id', DeliveryController.updateDelivery);
routes.delete('/delivery/:id', DeliveryController.deleteDelivery);

routes.put(
  '/deliveryman/:id/deliveries',
  OrderController.withdrawOrderForDelivery
);
routes.get('/deliveryman/:id/deliveries', OrderController.orderToDelivery);
routes.get('/delivered/:id', OrderController.orderAlreadyDelivered);
routes.post(
  '/delivered/:id/finish',
  upload.single('file'),
  OrderController.finishOrder
);

routes.get('/delivery/problems', DeliveryProblemController.listAll);
routes.get('/delivery/:id/problems', DeliveryProblemController.index);
routes.post('/delivery/:id/problems', DeliveryProblemController.reportAProblem);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemController.cancelDelivery
);

routes.post('/users', UserController.store);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
