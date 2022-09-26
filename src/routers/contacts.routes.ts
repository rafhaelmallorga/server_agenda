import { Router } from "express";
import ContactsControllers from "../controllers/contact.controller";
import { authUser } from "../middleware/authToken.middleware";


const routes = Router();

export const contactsRoutes = () => {
    routes.post('/:client_id', authUser, ContactsControllers.create);
    routes.get('/:client_id', authUser, ContactsControllers.listByClientId);
    routes.get('/info/:id', authUser, ContactsControllers.retrieve);
    routes.patch('/info/:id', authUser, ContactsControllers.update);
    routes.delete('/info/:id', authUser, ContactsControllers.delete);
    
    
    return routes
}