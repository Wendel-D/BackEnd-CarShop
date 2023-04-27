import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();
const ROTA = '/motorcycles/:id';

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).findAll(),
);

routes.get(
  ROTA,
  (req, res, next) => new MotorcycleController(req, res, next).findById(),
);

routes.put(
  ROTA,
  (req, res, next) => new MotorcycleController(req, res, next).update(),
);

routes.delete(
  ROTA,
  (req, res, next) => new MotorcycleController(req, res, next).delete(),
);

export default routes;