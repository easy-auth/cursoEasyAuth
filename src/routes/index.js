import usersRoute from './usersRoute';
import vehicleRoute from './vehiclesRoute';
import clientsRoute from '../routes/clientsRoute';
import addressRoute from '../routes/addressRoute';

export default (app) => {
    usersRoute(app);
    vehicleRoute(app);
    clientsRoute(app);
    addressRoute(app);
} 