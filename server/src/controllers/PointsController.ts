import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async show(request: Request, response: Response){
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({ message: 'Point not found.' });
        }

        const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)
            .select('items.title');

        return response.json({ point, items });
    }

    async create(request: Request, response: Response){
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
    
        const point = {
            name,
            image: 'whatever',
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
        }

        const insertedIds = await knex('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                point_id,
                item_id,
            }
        });
    
        await knex('points_items').insert(pointItems);
    
        return response.json({ 
            id: point_id,
            ...point,
         });
    }
}

export default PointsController;
