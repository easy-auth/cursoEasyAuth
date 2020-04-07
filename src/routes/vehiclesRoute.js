import { storeVehicle } from '../controllers/vehicleController';
import { schema } from '../models/vehicleModel';
import validation from '../middlewares/validationMiddleware';

export default (app) => {
    app.route('/vehicle/store')
        .post(validation(schema.storeVehicle, 'body'), (req, res) => {
            storeVehicle(req.body).then(response => {
                res.status(response.statusCode)
                res.json(response.data)
            })
        })
}