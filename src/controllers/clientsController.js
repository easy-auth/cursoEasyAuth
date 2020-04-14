import httpStatus from 'http-status';
import { store, update, remove, get, getAll } from "../models/clientsModel";

const __defaultResponse = (data, statusCode = httpStatus.OK) => ({
    data,
    statusCode: data.error === true ? httpStatus.BAD_REQUEST : httpStatus.OK
});

const __errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => __defaultResponse(message, statusCode);


export const getClient = data => get(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const getAllClient = () => getAll()
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const storeClient = data => store(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const updateClient = data => update(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const removeClient = id => remove(id)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export default storeClient;