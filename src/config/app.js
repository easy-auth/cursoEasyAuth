import express from 'express';
import compression from 'compression';
import dotEnv from 'dotenv';
import cors from 'cors';
import routes from '../routes/index';
import bodyParser from 'body-parser';
import Joi from '@hapi/joi';

const app = express();
dotEnv.config();
app.use(cors());
app.use(bodyParser.json({limit: '3mb'}))
app.use(compression({filter: shouldCompression}));
app.set('port', process.env.PORT);

function shouldCompression(req, res) {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
}

app.get('/', async (req, res) => {
    const schema = Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        // password: Joi.string()
        //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

        // repeat_password: Joi.ref('password'),

        // access_token: [
        //     Joi.string(),
        //     Joi.number()
        // ],

        birth_year: Joi.number()
            .integer()
            .min(1900)
            .max(2013),

        // email: Joi.string()
        //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })


    //schema.validate({ username: 'abc', birth_year: 1994 });

    try {
        const value = await schema.validateAsync({ username: 'abc', birth_year: "1900s" });
        res.send(value)
    }
    catch (err) { res.send(err) }
});

routes(app);



export default app;