import {map, join} from 'lodash';

export const validation = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);
        if (error == null) return next();
        
        const message = map(error.details, row => row.message).join(', ')
        res.status(400).json({error: true, data: { message }})
    }
}

export default validation;