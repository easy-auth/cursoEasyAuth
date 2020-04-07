import { getUsers, storeUser, updateUser } from '../controllers/usersController';
import validation from '../middlewares/validationMiddleware';
import { schema } from '../models/usersModel'

export default (app) => {
    app.route('/users')
        .get((req, res) => {
            getUsers().then(response => {
                res.status(response.statusCode)
                res.json(response.data)
            })        
        });

    app.route('/users/store')
        .post(validation(schema.storeUser, 'body'), (req, res) => {
            storeUser(req.body).then(response => {
                res.status(response.statusCode)
                res.json(response.data)
            })
        })
    
    app.put('/users/update', (req, res) => {
        updateUser(req).then(response => {
            res.status(response.statusCode)
            res.json(response.data)
        })
    })

    app.delete('/users/delete', (req, res) => {
        deleteUser().then(response => {
            res.json(response.data)
            res.status(response.statusCode)
        })
    })
}