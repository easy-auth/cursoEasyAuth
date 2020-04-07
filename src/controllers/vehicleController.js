import httpStatus from 'http-status';
import { store } from "../models/vehicleModel";

const __defaultResponse = (data, statusCode = httpStatus.OK) => ({
    data,
    statusCode: data.error === true ? httpStatus.BAD_REQUEST : httpStatus.OK
});

const __errorResponse = (message, statusCode = httpStatus.BAD_REQUEST) => defaultResponse(message, statusCode);


export const storeVehicle = (data) => store(data)
    .then(result => __defaultResponse(result))
    .catch(err => __errorResponse(err));

export default storeVehicle;