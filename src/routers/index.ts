import { Express } from "express";
import { clientsRoutes } from "./clients.routes";
import { contactsRoutes } from "./contacts.routes";
import { reportRoutes } from "./report.routes";
import { userRoutes } from "./user.routes";

const appRoutes = (app: Express) => {
    app.use('/clients', clientsRoutes())
    app.use('/contacts', contactsRoutes())
    app.use('/user', userRoutes())
    app.use("/report/clients", reportRoutes())
}

export default appRoutes