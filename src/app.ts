import express from "express"
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";
import appRoutes from "./routers";
import "express-async-errors"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"
import path from "path";
import cors from 'cors'


const app = express()

app.use(express.json())
app.use(cors())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.set("views", path.join(__dirname, "report"))
app.set("view engine", "ejs")

appRoutes(app)

app.use(handleAppErrorMiddleware)


export default app;