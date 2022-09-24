import { Request, Response } from "express";
import ContactsServices from "../services/contact.service";
import 'express-async-errors'

class ContactsControllers {
    static async create(req: Request, res: Response) {
        const {
            full_name,
            email,
            phone
        } = req.body

        const client_id = req.params.client_id

        const newContact = await ContactsServices.createContactService({
            client_id,
            full_name,
            email,
            phone
        })

        return res.status(201).json(newContact)
    }

    static async listByClientId(req: Request, res: Response) {
        const client_id = req.params.client_id

        const contactList = await ContactsServices.listContactsByClientId(client_id)

        return res.status(200).json(contactList)
    }

    static async retrieve(req: Request, res: Response) {
        const id = req.params.id

        const contact = await ContactsServices.retrieveContactService(id)

        return res.status(200).json((contact))
    }

    static async update(req: Request, res: Response) {
        const id = req.params.id
        const contactUpdated = await ContactsServices.update(id, req.body)

        return res.status(200).json(contactUpdated)


    }

    static async delete (req: Request, res: Response) {
        const id = req.params.id

        await ContactsServices.delete(id)

        return res.status(204).json({message: "Contact deleted with success"})

    }

}

export default ContactsControllers