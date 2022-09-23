import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";
import { Client } from "../entities/client.entity";
import { IClientCreate } from "../interfaces/clients";


class ClientsServices {
    static async createClientService({
        full_name,
        email,
        phone
    }: IClientCreate): Promise<Client | AppError> {
        const clientRepository = AppDataSource.getRepository(Client)

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
}

export default ClientsServices