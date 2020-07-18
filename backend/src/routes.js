//O router permite separar as rotas em outro file
const { Router } = require('express');

const routes = new Router();

routes.get('/', (request, response) => {
    return response.json({message: 'Hello World'})
});
export default routes;    