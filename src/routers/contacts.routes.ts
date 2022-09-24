import { Router } from "express";
import ContactsControllers from "../controllers/contact.controller";


const routes = Router();

export const contactsRoutes = () => {
    routes.post('/:client_id', ContactsControllers.create);
    routes.get('/:client_id', ContactsControllers.listByClientId);
    routes.get('/info/:id', ContactsControllers.retrieve);
    routes.patch('/info/:id', ContactsControllers.update);
    routes.delete('/info/:id', ContactsControllers.delete);
    
    
    return routes
}