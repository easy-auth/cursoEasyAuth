import usersRoute from './usersRoute';
import vehicleRoute from './vehiclesRoute';
export default (app) => {
    usersRoute(app);
    vehicleRoute(app);
} 