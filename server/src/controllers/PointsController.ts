import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
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
