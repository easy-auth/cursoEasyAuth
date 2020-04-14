import Promise from 'bluebird';
import Joi from '@hapi/joi';
import db from '../config/db.js';
import _ from 'lodash';

/**
 * 
 * @name Response Default
 * @description Handler to format a response pattern
 * @param {Boolean} status 
 * @param {any} data 
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
const __responseDefault = (status, data) => { return {error: status, data}}

/**
 * 
 * @name Get All Vehicles
 * @description Get All Vehicles
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
export const getAll = () => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("SELECT brand, year, model, plate, situation, mileage, status, users_id FROM vehicles", (err, res) => {
        conn.end();
        if(err) reject(__responseDefault(true, {message: "Error while we find your vehicle, please, refresh this page and try again!"}))

        resolve(__responseDefault(false, res))
    });
})

/**
 * 
 * @name Get Vehicle
 * @description Get One Vehicle by ID
 * @param {Object} data - Vehicle information
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
export const get = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("SELECT brand, year, model, plate, situation, mileage, status, users_id FROM vehicles WHERE id = ? LIMIT 1", [data.id], (err, res) => {
        conn.end();
        if(err) reject(__responseDefault(true, {message: "Error while we find your vehicle, please, refresh this page and try again!"}))
        if(res.length <= 0) reject(__responseDefault(true, {message: "Vehicle does not exists"}))
        resolve(__responseDefault(false, res))
    });
})

/**
 * 
 * @name Store Vehicle
 * @description Store a new Vehicle
 * @param {Object} data - Vehicles information to store 
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
export const store = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query('INSERT INTO vehicles (brand, year, model, plate, situation, mileage, status, users_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [data.brand, data.year, data.model, data.plate, data.situation, data.mileage, data.status, data.user_id || null], (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: "Error while we try register your vehicle" }));
        resolve(__responseDefault(false, res))
    })
}).catch(err => err)

/**
 * 
 * @name Update Vehicle
 * @description Update a vehicle by ID
 * @param {Object} data - Vehicle data to update
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
export const update = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("UPDATE vehicles SET " + _.join(_.keys(data), "=? , ") + "=? WHERE id = '" + data.id + "'", _.values(data), (err, res) => {
        conn.end();
        if(err) reject(__responseDefault(true, {message: 'Error while we update your vehicle!'}))
        if (res.affectedRows < 1) reject(__responseDefault(true, {message: 'Vehicle does not exists!'}))

        resolve(__responseDefault(false, res))
    });
}).catch(err => err)

/**
 * 
 * @name Vehicle Remove
 * @description Function for delete vehicle from database by ID
 * @param {Integer} id - Vehicle Identification 
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
export const remove  = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("DELETE FROM vehicles WHERE id = ?", [data.id], (err, res) => {
        conn.end();
        if(err) reject(__responseDefault(true, {message: "Problem while we try delete your vehicle, please, refresh this page and try again!"}));
        if (res.affectedRows < 1) reject(__responseDefault(true, { message: 'Vehicle does not exists!' }))

        resolve(__responseDefault(false, res));
    });
})

/**
 * 
 * @name Vehicle Schema
 * @description JOI Schume to validation request
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
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
    }),
    updateVehicle: Joi.object().keys({
        brand: Joi.string().min(3).max(100),
        year: Joi.number().min(2005).max(2021),
        model: Joi.string().max(100),
        plate: Joi.string().max(45),
        situation: Joi.string().max(4),
        status: Joi.string().max(4),
        mileage: Joi.number(),
        users_id: Joi.number(),
        id: Joi.number().required()
    }).min(2),
    deleteVehicle: Joi.object().keys({
        id: Joi.number().required()
    }),
    getVehicle: Joi.object().keys({
        id: Joi.number().required()
    })
}

export default {store, schema}