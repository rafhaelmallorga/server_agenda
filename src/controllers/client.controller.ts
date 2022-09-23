import { Request, Response } from "express";
import ClientsServices from "../services/client.service";

class ClientsControllers {
    static async create(req: Request, res: Response) {
        const {
            full_name,
            email,
            phone
        } = req.body

        const newClient = await ClientsServices.createClientService({
            full_name,
            email,
            phone
        })

        return res.status(201).json(newClient)
    }

    static async list(req: Request, res: Response) {
        const clients = await ClientsServices.listClientsService()

        return res.status(200).json(clients)
    }

    static async retrieve(req: Request, res: Response) {
        const id = req.params.id
        const client = await ClientsServices.retrieveClientService(id)

        return res.status(200).json(client)

    }
}

export default ClientsControllers