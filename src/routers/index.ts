import { Express } from "express";
import { clientsRoutes } from "./clients.routes";
import { contactsRoutes } from "./contacts.routes";
import { userRoutes } from "./user.routes";

const appRoutes = (app: Express) => {
    app.use('/clients', clientsRoutes())
    app.use('/contacts', contactsRoutes())
    app.use('/user', userRoutes)
}

export default appRoutes