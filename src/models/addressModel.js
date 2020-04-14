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
 * @since 2020-04-13
 * @version 1.0
 */
const __responseDefault = (error, data) => { return { error, data } }

/**
 * 
 * @name Get All Address
 * @description Get All Address
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
export const getAll = () => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("SELECT label, `address` FROM address", (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: "Error while we find your address, please, refresh this page and try again!" }))

        resolve(__responseDefault(false, res))
    });
})

/**
 * 
 * @name Get Address
 * @description Get One Address by Label
 * @param {Object} data - Address information
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-13
 * @version 1.0
 */
export const get = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("SELECT label, `address` FROM address WHERE label = ? LIMIT 1", [data.label], (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: "Error while we find your address, please, refresh this page and try again!" }))
        if (res.length <= 0) reject(__responseDefault(true, { message: "Address does not exists" }))
        resolve(__responseDefault(false, res))
    });
})

/**
 * 
 * @name Store Address
 * @description Store a new Address
 * @param {Object} data - Address information to store 
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-13
 * @version 1.0
 */
export const store = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query('INSERT INTO address (`address`, label, clients_id) VALUES (?, ?, ?)', [data.address, Math.floor(Math.random() * 99999999999 + 1).toString(), data.client], (err, res) => {
        console.log(err)
        conn.end();
        if (err) reject(__responseDefault(true, { message: "Error while we try register your address" }));
        resolve(__responseDefault(false, res))
    })
}).catch(err => err)

/**
 * 
 * @name Update Address
 * @description Update a address by label
 * @param {Object} data - Address data to update
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-13
 * @version 1.0
 */
export const update = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("UPDATE address SET " + _.join(_.keys(data), "=? , ") + "=? WHERE label = '" + data.label + "'", _.values(data), (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: 'Error while we update your address!' }))
        if (res.affectedRows < 1) reject(__responseDefault(true, { message: 'Address does not exists!' }))

        resolve(__responseDefault(false, res))
    });
}).catch(err => err)

/**
 * 
 * @name Client Remove
 * @description Function for delete vehicle from database by ID
 * @param {Integer} id - Vehicle Identification 
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-13
 * @version 1.0
 */
export const remove = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("DELETE FROM address WHERE label = ?", [data.label], (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: "Problem while we try delete your address, please, refresh this page and try again!" }));
        if (res.affectedRows < 1) reject(__responseDefault(true, { message: 'Address does not exists!' }))

        resolve(__responseDefault(false, res));
    });
})

/**
 * 
 * @name Client Schema
 * @description JOI Schume to validation request
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-13
 * @version 1.0
 */
export const schema = {
    storeAddress: Joi.object().keys({
        address: Joi.string().required().min(5),
        client: Joi.number().required()
    }),
    updateAddress: Joi.object().keys({
        address: Joi.string().required().min(5),
        label: Joi.string().required().min(5),
    }).min(2),
    deleteAddress: Joi.object().keys({
        label: Joi.string().required()
    }),
    getAddress: Joi.object().keys({
        label: Joi.string().required()
    })
}

export default { store, schema }