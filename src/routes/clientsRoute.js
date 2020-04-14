import { schema } from '../models/clientsModel';
import { getClient, getAllClient, storeClient, updateClient, removeClient } from '../controllers/clientsController'
import validation from '../middlewares/validationMiddleware';

export default (app) => {

    app.route('/clients/get')
        .get(validation(schema.getClients, 'query'), (req, res) =>
            getClient(req.query).then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/clients/get-all')
        .get((req, res) =>
            getAllClient().then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/clients/store')
        .post(validation(schema.storeClients, 'body'), (req, res) =>
            storeClient(req.body).then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/clients/update')
        .put(validation(schema.updateClients, 'body'), (req, res) =>
            updateClient(req.body).then(response => res.status(response.statusCode).json(response.data))
        )

    app.route('/clients/delete')
        .delete(validation(schema.deleteClients, 'query'), (req, res) =>
            removeClient(req.query).then(response => res.status(response.statusCode).json(response.data))
        )
}