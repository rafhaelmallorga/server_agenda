import { Router } from "express";
import ClientsControllers from "../controllers/client.controller";


const routes = Router();

export const clientsRoutes = () => {
    routes.post('', ClientsControllers.create);
    routes.get('', ClientsControllers.list);

    return routes
    
}