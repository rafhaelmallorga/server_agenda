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

let contact1 = {
    full_name: 'contact1',
    email: 'contact1@email.com',
    phone: '11 3003-3003'
}

let contact2 = {
    full_name: 'contact2',
    email: 'contact2@email.com',
    phone: '11 3003-3003'
}


describe("Testing the contact creation", () => {
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

        await request(app).post('/clients').set('Authorization', `Bearer ${token}`).send(client1)
    })

    afterAll(async () => {
        await connection.destroy()
    })


    it("Should create a new contact", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const client = await (await request(app).get('/clients').set('Authorization', `Bearer ${token}`)).body[0]
        const response = await request(app).post(`/contacts/${client.id}`).set('Authorization', `Bearer ${token}`).send(contact1)

        expect(response.status).toBe(201)
        expect(response.body.id.length).toEqual(36)
        expect(response.body).toHaveProperty('client')
        expect(response.body.client.id).toEqual(client.id)

    })


    it("Should not create a contact with request body blank", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body
        
        const client = await (await request(app).get('/clients').set('Authorization', `Bearer ${token}`)).body[0]
        const response = await request(app).post(`/contacts/${client.id}`).set('Authorization', `Bearer ${token}`).send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")

    })
})

describe("Testing the contact list method", () => {
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

        const client = await request(app).post('/clients').set('Authorization', `Bearer ${token}`).send(client1)
        await request(app).post(`/contacts/${client.body.id}`).set('Authorization', `Bearer ${token}`).send(contact1)
        await request(app).post(`/contacts/${client.body.id}`).set('Authorization', `Bearer ${token}`).send(contact2)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it("Test list contacts by client id", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const client = await (await request(app).get('/clients').set('Authorization', `Bearer ${token}`)).body[0]
        const response = await request(app).get(`/contacts/${client.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(2)
    })


})

describe("Testing GET, PATCH, and DELETE contacts method", () => {
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

        const client = await request(app).post('/clients').set('Authorization', `Bearer ${token}`).send(client1)
        await request(app).post(`/contacts/${client.body.id}`).set('Authorization', `Bearer ${token}`).send(contact1)

    })

    afterAll(async () => {
        await connection.destroy()
    })

    it("Test contact retrieve", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const client = await (await request(app).get('/clients').set('Authorization', `Bearer ${token}`)).body[0]
        const contacts = await (await request(app).get(`/contacts/${client.id}`).set('Authorization', `Bearer ${token}`)).body[0]
        const response = await request(app).get(`/contacts/info/${contacts.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("client")
    })

    it("Test contact update", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const client = await (await request(app).get('/clients').set('Authorization', `Bearer ${token}`)).body[0]
        const contacts = await (await request(app).get(`/contacts/${client.id}`).set('Authorization', `Bearer ${token}`)).body[0]
        const response = await request(app).patch(`/contacts/info/${contacts.id}`).set('Authorization', `Bearer ${token}`).send({full_name: 'updated'})


        expect(response.status).toEqual(200)
        expect(response.body.full_name).toEqual('updated')
        expect(response.body).toHaveProperty("client")
    })

    it("Test contact update wrong id params", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body

        const response = await request(app).patch(`/contact/info/feasdferwq124`).set('Authorization', `Bearer ${token}`).send({full_name: 'updated'})

        expect(response.status).toEqual(404)
    })

    it("Test contact delete", async () => {
        const loginUser = await request(app).post("/user/login").send(login)
        const { token } = loginUser.body
        
        const client = await (await request(app).get('/clients').set('Authorization', `Bearer ${token}`)).body[0]
        const contacts = await (await request(app).get(`/contacts/${client.id}`).set('Authorization', `Bearer ${token}`)).body[0]
        const response = await request(app).delete(`/contacts/info/${contacts.id}`).set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(204)
    })


})