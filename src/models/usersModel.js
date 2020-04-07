import db from '../config/db';
import Promise from 'bluebird';
import bcrypt from 'bcrypt';
import _ from "lodash";
import Joi from '@hapi/joi';

export const getAll = () => new Promise((resolve, reject) => {
    const conn = db();
    conn.connect();

    conn.query("SELECT * FROM users", (err, res) => {
        conn.end();
        if (err) reject({
            error: true,
            data: {
                message: 'Error white get all users'
            }
        });
        resolve({
            error: false,
            data: res
        });
    })
}).catch(err => err)

export const store = data => new Promise(async (resolve, reject) => {
    const conn = db();
    conn.connect();
    const hash = bcrypt.hashSync(data.password, 10);
    conn.query("INSERT INTO users (name, email, label, birthday, begin, setor, password) VALUES (?, ?, ?, ?, ?, ?, ?)", [data.name, data.email, Math.floor(Math.random() * 99999999999 + 1), data.birthday, data.begin, data.setor, hash], (err, res) => {
        conn.end();
        if (err) reject({
            error: true,
            data: err
        })

        resolve({
            error: false,
            data: res
        })
    })
}).catch(err => err);

export const update = (data) => new Promise(async (resolve, reject) => {
    const conn = db();
    conn.connect();
    conn.query("UPDATE users SET " + _.join(_.keys(data), "=? , ") + "=? WHERE label = '" + data.label + "'", _.values(data), (err, res) => {
        conn.end();
        if (err) reject({
            error: true,
            data: err
        })

        resolve({
            error: false,
            data: res
        })
    })
}).catch(err => err);

export const schema = {
    storeUser: Joi.object().keys({
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().email().required(),
        birthday: Joi.date().iso().required(),
        begin: Joi.date().iso(),
        setor: Joi.string().required(),
        password: Joi.string().required().min(6).max(255)
    }),
    updateUser: Joi.object().keys({
        name: Joi.string().min(10).max(255),
        email: Joi.string().email(),
        birthday: Joi.date().iso(),
        begin: Joi.date().iso(),
        setor: Joi.string(),
        label: Joi.string().required().min(6).max(100)
    }).min(2).max(6)
}

export default { getAll }