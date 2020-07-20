// O router permite separar as rotas em outro file
const { Router } = require("express");
import User from './app/models/User';

const routes = new Router();

routes.get("/", async (request, response) => {
  const user = await User.create({
    name: 'Rafael Marinho',
    email: 'rafael@gmail.com',
    password_hash: '2764287346',
  });

  return response.json(user);
});
export default routes;
