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
 * @name Get All Vehicles
 * @description Get All Vehicles
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
export const getAll = () => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("SELECT name, label, cnpj, state, city, address, email, phone, status FROM clients", (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: "Error while we find your clients, please, refresh this page and try again!" }))

        resolve(__responseDefault(false, res))
    });
})

/**
 * 
 * @name Get Vehicle
 * @description Get One Client by ID
 * @param {Object} data - Vehicle information
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
export const get = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("SELECT name, label, cnpj, state, city, address, email, phone, status FROM clients WHERE label = ? LIMIT 1", [data.label], (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: "Error while we find your client, please, refresh this page and try again!" }))
        if (res.length <= 0) reject(__responseDefault(true, { message: "Client does not exists" }))
        resolve(__responseDefault(false, res))
    });
})

/**
 * 
 * @name Store Client
 * @description Store a new Client
 * @param {Object} data - Client information to store 
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-13
 * @version 1.0
 */
export const store = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query('INSERT INTO clients (name, label, cnpj, state, city, address, email, phone, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, Math.floor(Math.random() * 99999999999 + 1).toString(), data.cnpj, data.state, data.city, data.address, data.email, data.phone, data.status], (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: "Error while we try register your client" }));
        resolve(__responseDefault(false, res))
    })
}).catch(err => err)

/**
 * 
 * @name Update Client
 * @description Update a client by label
 * @param {Object} data - Client data to update
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-07
 * @version 1.0
 */
export const update = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("UPDATE clients SET " + _.join(_.keys(data), "=? , ") + "=? WHERE label = '" + data.label + "'", _.values(data), (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: 'Error while we update your client!' }))
        if (res.affectedRows < 1) reject(__responseDefault(true, { message: 'Client does not exists!' }))

        resolve(__responseDefault(false, res))
    });
}).catch(err => err)

/**
 * 
 * @name Client Remove
 * @description Function for delete client from database by label
 * @param {Object} data - Client Identification 
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-13
 * @version 1.0
 */
export const remove = data => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("DELETE FROM clients WHERE label = ?", [data.label], (err, res) => {
        conn.end();
        if (err) reject(__responseDefault(true, { message: "Problem while we try delete your client, please, refresh this page and try again!" }));
        if (res.affectedRows < 1) reject(__responseDefault(true, { message: 'Client does not exists!' }))

        resolve(__responseDefault(false, res));
    });
})

/**
 * 
 * @name Client Schema
 * @description JOI Scheme to validation request
 * @author Vinicius R. S. dos Santos
 * @since 2020-04-13
 * @version 1.0
 */
export const schema = {
    storeClients: Joi.object().keys({
        name: Joi.string().required().min(5),
        cnpj: Joi.number().required().min(11),
        state: Joi.string().required().min(2).max(2),
        city: Joi.string().required().min(2),
        address: Joi.string().required().min(2),
        email: Joi.string().email().required(),
        phone: Joi.string().required().min(14),
        status: Joi.boolean().required()
    }),
    updateClients: Joi.object().keys({
        name: Joi.string().min(5),
        cnpj: Joi.number().min(11),
        state: Joi.string().min(2).max(2),
        city: Joi.string().min(2),
        address: Joi.string().min(2),
        email: Joi.string().email(),
        phone: Joi.string().min(14),
        status: Joi.boolean(),
        label: Joi.string().required()
    }).min(2),
    deleteClients: Joi.object().keys({
        label: Joi.string().required()
    }),
    getClients: Joi.object().keys({
        label: Joi.string().required()
    })
}

export default { store, schema }