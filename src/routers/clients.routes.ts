import { Router } from "express";
import ClientsControllers from "../controllers/client.controller";


const routes = Router();

export const clientsRoutes = () => {
    routes.post('', ClientsControllers.create);
    routes.get('', ClientsControllers.list);
    routes.get('/:id', ClientsControllers.retrieve);
    routes.patch('/:id', ClientsControllers.update);
    routes.delete('/:id', ClientsControllers.delete);

    return routes
    
}