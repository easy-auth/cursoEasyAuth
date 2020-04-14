import { schema } from '../models/addressModel';
import { getAddress, getAllAddress, storeAddress, updateAddress, removeAddress } from '../controllers/addressController'
import validation from '../middlewares/validationMiddleware';

export default (app) => {

    app.route('/address/get')
        .get(validation(schema.getAddress, 'query'), (req, res) =>
            getAddress(req.query).then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/address/get-all')
        .get((req, res) =>
            getAllAddress().then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/address/store')
        .post(validation(schema.storeAddress, 'body'), (req, res) =>
            storeAddress(req.body).then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/address/update')
        .put(validation(schema.updateAddress, 'body'), (req, res) =>
            updateAddress(req.body).then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/address/delete')
        .delete(validation(schema.deleteAddress, 'query'), (req, res) =>
            removeAddress(req.query).then(response => res.status(response.statusCode).json(response.data))
        )
}