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

    static async update(req: Request, res: Response) {
        const id = req.params.id
        const clientUpdated = await ClientsServices.updateClientService(id, req.body)

        return res.status(200).json(clientUpdated)
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id

        await ClientsServices.deleteClientService(id)

        return res.status(204).json({message: "Client deleted with success."})
    }

    static async generateReport(req: Request, res: Response) {
        
        const data = await ClientsServices.generateReport()

        return res.status(200).json(data)
    }
}

export default ClientsControllers