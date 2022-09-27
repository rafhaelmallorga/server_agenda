import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import request from "supertest"
import app from "../app"

let user = {
    first_name: 'Rafhael',
    last_name: 'Mallorga',
    email: 'rm@email.com',
    password: '1234'
}

let login = {
    email: 'rm@email.com',
    password: '1234'
}

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

            await request(app).post("/user").send(user)
    })

    afterAll(async () => {
        await connection.destroy()
    })


    it("Should create a new client", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const response = await request(app).post("/clients").set('Authorization', `Bearer ${token}`).send(client1)

        expect(response.status).toBe(201)
        expect(response.body.id.length).toEqual(36)
        expect(response.body).toHaveProperty('created_at')

    })

    it("Should not create a client with equal name", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const response = await request(app).post("/clients").set('Authorization', `Bearer ${token}`).send(client1)

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")

    })

    it("Should not create a client with equal email", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body


        const response = await request(app).post("/clients").set('Authorization', `Bearer ${token}`).send({
            full_name: 'client1.1',
            email: 'client1@email.com',
            phone: '11 3003-3003'
        })

        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty("message")

    })

    it("Should not create a client with request body blank", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body


        const response = await request(app).post("/clients").set('Authorization', `Bearer ${token}`).send({})

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
        
        await request(app).post("/user").send(user)

        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        await request(app).post('/clients').set('Authorization', `Bearer ${token}`).send(client1)
        await request(app).post('/clients').set('Authorization', `Bearer ${token}`).send(client2)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it("Test clients list all method", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const response = await request(app).get("/clients").set('Authorization', `Bearer ${token}`)

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

        await request(app).post("/user").send(user)

        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

    })

    afterAll(async () => {
        await connection.destroy()
    })

    it("Test client retrieve", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const client = await request(app).post('/clients').set('Authorization', `Bearer ${token}`).send(client1)
        const response = await request(app).get(`/clients/${client.body.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("created_at")
    })

    it("Test client update", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const client = await request(app).post('/clients').set('Authorization', `Bearer ${token}`).send(client2)
        const response = await request(app).patch(`/clients/${client.body.id}`).set('Authorization', `Bearer ${token}`).send({full_name: 'updated'})


        expect(response.status).toEqual(200)
        expect(response.body.full_name).toEqual('updated')
        expect(response.body).toHaveProperty("created_at")
    })

    it("Test client update wrong id params", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const response = await request(app).patch(`/clients/feasdferwq124`).set('Authorization', `Bearer ${token}`).send({full_name: 'updated'})

        expect(response.status).toEqual(404)
    })

    it("Test client delete", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body
        
        const clients = await request(app).get('/clients').set('Authorization', `Bearer ${token}`)
        const response = await request(app).delete(`/clients/${clients.body[0].id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(204)
    })


})