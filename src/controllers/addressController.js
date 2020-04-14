import httpStatus from 'http-status';
import { store, update, remove, get, getAll } from "../models/addressModel";

const __defaultResponse = (data, statusCode = httpStatus.OK) => ({
    data,
    statusCode: data.error === true ? httpStatus.BAD_REQUEST : httpStatus.OK
});

const __errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => __defaultResponse(message, statusCode);

export const getAddress = data => get(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const getAllAddress = () => getAll()
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const storeAddress = data => store(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const updateAddress = data => update(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const removeAddress = id => remove(id)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export default storeAddress;