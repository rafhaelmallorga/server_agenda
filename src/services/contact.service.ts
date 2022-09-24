import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";
import { Contact } from "../entities/contact.entity";
import { Client } from "../entities/client.entity";
import { IContactCreate } from "../interfaces/contacts";
import { IClientCreate } from "../interfaces/clients";


class ContactsServices {
    static async createContactService({
        client_id,
        full_name,
        email,
        phone
    }: IContactCreate): Promise<Contact | AppError> {
        const contactRepository = AppDataSource.getRepository(Contact);
        const clientRepository = AppDataSource.getRepository(Client)

        if (!full_name || !email || !phone) {
            throw new AppError(400, 'Requisition body is incomplete or empty')
        }

        const client = await clientRepository.findOne({
            where: {
                id: client_id
            }
        })

        if (!client) {
            throw new AppError(404, 'Client not found')
        }

        const newContact = new Contact();
        newContact.full_name = full_name;
        newContact.email = email;
        newContact.phone = phone;
        newContact.client = client

        await contactRepository.save(newContact)

        return newContact
    }

    static async listContactsByClientId (client_id:string) {
        const contactRepository = AppDataSource.getRepository(Contact)
        const clientRepository = AppDataSource.getRepository(Client)
        const contacts = await contactRepository.find()

        console.log(client_id)
        
        if (!(await clientRepository.findOne({where: {id: client_id}}))) {
            throw new AppError(404, 'Client not found')
        }
        
        const contactsFiltered = contacts.filter(contact => contact.client.id === client_id)


        return contactsFiltered
    }

    static async retrieveContactService(id: string) {
        const contactRepository = AppDataSource.getRepository(Contact)
        const contact = await contactRepository.findOne({where: {id}})

        if (!contact) {
            throw new AppError(404, 'Contact not found')
        }

        return contact
    }

    static async update(id: string, data: IContactCreate) {
        const contactRepository = AppDataSource.getRepository(Contact)
        const contact = await contactRepository.findOne({where: {id}})

        if (!contact) {
            throw new AppError(404, 'Contact not found')
        }

        const contactUpdated = await contactRepository.update(contact!.id, data);

        if (contactUpdated.affected === 1) {
            const contactObj = await contactRepository.findOneBy({id: id})
            return contactObj
        }

    }

    static async delete (id: string) {
        const contactRepository = AppDataSource.getRepository(Contact)
        const contact = await contactRepository.findOne({where: {id}})

        if (!contact) {
            throw new AppError(404, 'Contact not found')
        }

        await contactRepository.delete(contact!.id)

        return true
    }
}

export default ContactsServices