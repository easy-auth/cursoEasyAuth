import Promise from 'bluebird';
import Joi from '@hapi/joi';
import db from '../config/db.js';

export const store = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query('INSERT INTO vehicles (brand, year, model, plate, situation, mileage, status, users_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.brand, data.year, data.model, data.plate, data.situation, data.mileage, data.status, data.user_id || null], (err, res) => {
        console.log(err);
        if(err) reject({error: true, data: {message: "Error while we try register your vehicle"}});
        resolve({error: false, data: res})
    })
}).catch(err => err)

export const schema = {
    storeVehicle: Joi.object().keys({
        brand: Joi.string().required().min(3).max(100),
        year: Joi.number().required().min(2005).max(2021),
        model: Joi.string().required().max(100),
        plate: Joi.string().required().max(45),
        situation: Joi.string().required().max(4),
        status: Joi.string().required().max(4),
        mileage: Joi.number().required(),
        users_id: Joi.number()
    })
}

export default {store, schema}