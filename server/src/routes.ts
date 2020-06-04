import express from 'express';
import knex from './database/connection';

const routes = express.Router();


routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3001/uploads/${item.image}`,
        }
    });

    return response.json(serializedItems);
});

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        city,
        uf,
        latitude,
        longitude,
        items,
    } = request.body;

    const insertedIds = await knex('points').insert({
        name,
        image: 'whatever',
        email,
        whatsapp,
        city,
        uf,
        latitude,
        longitude,
    });

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
        return {
            point_id,
            item_id,
        }
    });

    await knex('points_items').insert(pointItems);

    return response.json({ success: true });
});

export default routes;
