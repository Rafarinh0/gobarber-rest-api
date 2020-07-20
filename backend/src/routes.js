// O router permite separar as rotas em outro file
const { Router } = require("express");

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

export default routes;
