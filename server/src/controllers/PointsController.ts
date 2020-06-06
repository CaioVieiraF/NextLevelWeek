import {Request, Response} from 'express';
import knex from '../database/connection';

class PointsController{

    async index(request: Request, response: Response) {

        const {city, uf, itens} = request.query;

        const parsedItens = String(itens)
        .split(',')
        .map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_item', 'points.id', '=', 'point_item.point_id')
        .whereIn('point_item.item_id', parsedItens)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.0.123:3022/uploads/${point.image}`
            };
        });


        return response.json(serializedPoints);
    };

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
            itens
        } = request.body;

        const trx = await knex.transaction();

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude
        };

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItem = itens
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) =>{
            return {
                item_id,
                point_id

            };
        });

        await trx('point_item').insert(pointItem);

        trx.commit();
        return response.json({
            id: point_id,
            ...point
        });
    };

    async show(request: Request, response: Response) {

        const {id} = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({message: "Point not found"});
        }

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.0.123:3022/uploads/${point.image}`
        }

        const item = await knex('itens')
        .join('point_item', 'itens.id', '=', 'point_item.item_id')
        .where('point_item.point_id', id)
        .select('itens.title', 'itens.id');

        return response.json({point: serializedPoint, item});
    };
};

export default PointsController;
