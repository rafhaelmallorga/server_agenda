import { Router } from "express";
import ClientsControllers from "../controllers/client.controller";
import { authUser } from "../middleware/authToken.middleware";


const routes = Router();

export const clientsRoutes = () => {
    routes.post('', authUser, ClientsControllers.create);
    routes.get('', authUser, ClientsControllers.list);
    routes.get('/:id', authUser, ClientsControllers.retrieve);
    routes.patch('/:id', authUser, ClientsControllers.update);
    routes.delete('/:id', authUser, ClientsControllers.delete);

    return routes
    
}