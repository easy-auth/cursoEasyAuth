import { storeVehicle, updateVehicle, removeVehicle, getVehicle, getAllVehicle } from '../controllers/vehicleController';
import { schema } from '../models/vehicleModel';
import validation from '../middlewares/validationMiddleware';

export default (app) => {

    app.route('/vehicle/get')
        .get(validation(schema.getVehicle, 'query'), (req, res) =>
            getVehicle(req.query).then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/vehicle/get-all')
        .get((req, res) =>
            getAllVehicle().then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/vehicle/store')
        .post(validation(schema.storeVehicle, 'body'), (req, res) => 
            storeVehicle(req.body).then(response => res.status(response.statusCode).json(response.data))
        )
    
    app.route('/vehicle/update')
        .put(validation(schema.updateVehicle, 'body'), (req, res) => 
            updateVehicle(req.body).then(response => res.status(response.statusCode).json(response.data))
        )
    
    app.route('/vehicle/delete')
        .delete(validation(schema.deleteVehicle, 'query'), (req, res) => 
            removeVehicle(req.query).then(response => res.status(response.statusCode).json(response.data))
        )
}