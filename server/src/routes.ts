import express, { RouterOptions } from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});

export default routes;