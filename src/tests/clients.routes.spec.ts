import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import request from "supertest"
import app from "../app"

let client1 = {
    full_name: 'client1',
    email: 'client1@email.com',
    phone: '11 3003-3003'
}

let client2 = {
    full_name: 'client2',
    email: 'client2@email.com',
    phone: '11 3003-3003'
}


describe("Testing the client creation", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
                console.log("Error during Data Source initialization", err)
            })
    })

    afterAll(async () => {
        await connection.destroy()
    })


    it("Should create a new client", async () => {
        const response = await request(app).post("/clients").send(client1)

        expect(response.status).toBe(201)
        expect(response.body.id.length).toEqual(36)
        expect(response.body).toHaveProperty('created_at')

    })

    it("Should not create a client with equal name", async () => {
        const response = await request(app).post("/clients").send(client1)

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")

    })

    it("Should not create a client with equal email", async () => {
        const response = await request(app).post("/clients").send({
            full_name: 'client1.1',
            email: 'client1@email.com',
            phone: '11 3003-3003'
        })

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")

    })

    it("Should not create a client with request body blank", async () => {
        const response = await request(app).post("/clients").send({})

        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty("message")
        expect(response.body).toHaveProperty("details")

    })
})

describe("Testing the client list method", () => {
    let connection: DataSource;
    let clientId

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
                console.log("Error during Data Source initialization", err)
            })

        await request(app).post('/clients').send(client1)
        await request(app).post('/clients').send(client2)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it("Test clients list all method", async () => {
        const response = await request(app).get("/clients")

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(2)
    })


})

describe("Testing GET, PATCH, and DELETE client method", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
                console.log("Error during Data Source initialization", err)
            })

    })

    afterAll(async () => {
        await connection.destroy()
    })

    it("Test client retrieve", async () => {
        const client = await request(app).post('/clients').send(client1)
        const response = await request(app).get(`/clients/${client.body.id}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("created_at")
    })

    it("Test client update", async () => {
        const client = await request(app).post('/clients').send(client2)
        const response = await request(app).patch(`/clients/${client.body.id}`).send({full_name: 'updated'})


        expect(response.status).toEqual(200)
        expect(response.body.full_name).toEqual('updated')
        expect(response.body).toHaveProperty("created_at")
    })

    it("Test client update wrong id params", async () => {
        const response = await request(app).patch(`/clients/feasdferwq124`).send({full_name: 'updated'})

        expect(response.status).toEqual(404)
    })

    it("Test client delete", async () => {
        const clients = await request(app).get('/clients')
        const response = await request(app).delete(`/clients/${clients.body[0].id}`)

        expect(response.status).toEqual(204)
    })


})