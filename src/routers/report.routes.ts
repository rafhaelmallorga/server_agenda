import { Router } from "express";
import ClientsControllers from "../controllers/client.controller";
import { authUser } from "../middleware/authToken.middleware";


const routes = Router();

export const reportRoutes = () => {    
    routes.get('', ClientsControllers.generateReport);
    routes.get('/pdf', ClientsControllers.generatePDFReport);

    return routes
}