import express from "express"

const app = express()

app.use(express.json())

app.use('/clients', () => console.log('clientes ok'))

app.listen(3000, () => console.log('Server is running'))