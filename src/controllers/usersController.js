import {getAll, store, update} from '../models/usersModel';
import httpStatus from 'http-status';

const __defaultResponse = (data, statusCode = httpStatus.OK) => ({
    data,
    statusCode: data.error === true ? httpStatus.BAD_REQUEST : httpStatus.OK
});

const __errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse(message, statusCode);

export const getUsers = () => getAll()
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const storeUser = (data) => store(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const updateUser = (data) => update(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export default { getUsers }