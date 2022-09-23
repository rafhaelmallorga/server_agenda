import express from "express"

const app = express()

app.use(express.json())

app.use('/clients', () => console.log('clientes ok'))




export default app;