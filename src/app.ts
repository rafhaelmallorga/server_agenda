import express from "express"
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";
import appRoutes from "./routers";
import "express-async-errors"

const app = express()

app.use(express.json())

appRoutes(app)

app.use(handleAppErrorMiddleware)


export default app;