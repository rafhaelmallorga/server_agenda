import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";
import { Client } from "../entities/client.entity";
import { Contact } from "../entities/contact.entity";
import { IClientCreate } from "../interfaces/clients";


class ClientsServices {
    static async createClientService({
        full_name,
        email,
        phone
    }: IClientCreate): Promise<Client | AppError> {
        const clientRepository = AppDataSource.getRepository(Client)

        const clients = await clientRepository.find();

        if (clients.find(client => client.full_name === full_name)) {
            throw new AppError(409, 'This client already exists!')
        }

        if (clients.find(client => client.email === email)) {
            throw new AppError(409, 'This client already exists!')
        }

        const newClient = new Client();
        newClient.full_name =full_name;
        newClient.email = email;
        newClient.phone = phone;
        newClient.created_at = new Date()

        const createdClient = clientRepository.create(newClient);
        await clientRepository.save(createdClient);

        return createdClient
    }

    static async  listClientsService(): Promise<Client[] | AppError> {
        const clientRepository = AppDataSource.getRepository(Client)
        const clients = await clientRepository.find()

        return clients
    }

    static async retrieveClientService(id: string) {
        const clientRepository = AppDataSource.getRepository(Client)
        const client = await clientRepository.findOne({where: {id}})

        if (!client) {
            throw new AppError(404, 'Client not found.')
        }

        return client
    }

    static async updateClientService(id: string, data: IClientCreate) {
        const clientRepository = AppDataSource.getRepository(Client)
        const clients = await clientRepository.find()
        const clientFound = clients.find(client => client.id === id)

        if (!clientFound) {
            throw new AppError(404, 'Client not found')
        }

        const client = await clientRepository.update(clientFound!.id, data);

        if (client.affected === 1) {
            const clientUpdated = await clientRepository.findOneBy({id: id})
            return clientUpdated
        }



    }

    static async deleteClientService(id: string) {
        const clientRepository = AppDataSource.getRepository(Client)
        const clients = await clientRepository.find()
        const clientFound = clients.find(client => client.id === id)

        if (!clientFound) {
            throw new AppError(404, 'Client not found')
        }

        await clientRepository.delete(clientFound!.id)

        return true
    }

    static async generateReport () {
        const clientRepository = AppDataSource.getRepository(Client)
        const contactRepository = AppDataSource.getRepository(Contact)

        const clients = await clientRepository.find()
        const contacts = await contactRepository.find()

        let reportData = clients.map(client => contacts.filter(contact => contact.client.id === client.id))

        
        return {reportData, clients}

    }
}

export default ClientsServices