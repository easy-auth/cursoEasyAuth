import httpStatus from 'http-status';
import { store, update, remove, get, getAll } from "../models/vehicleModel";

const __defaultResponse = (data, statusCode = httpStatus.OK) => ({
    data,
    statusCode: data.error === true ? httpStatus.BAD_REQUEST : httpStatus.OK
});

const __errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => __defaultResponse(message, statusCode);


export const getVehicle = data => get(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const getAllVehicle = () => getAll()
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const storeVehicle = data => store(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const updateVehicle = data => update(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export const removeVehicle = id => remove(id)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export default storeVehicle;