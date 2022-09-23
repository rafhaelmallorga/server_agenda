import { Express } from "express";
import { clientsRoutes } from "./clients.routes";
import { contactsRoutes } from "./contacts.routes";

const appRoutes = (app: Express) => {
    app.use('/clients', clientsRoutes())
    app.use('/contacts', contactsRoutes())
}

export default appRoutes