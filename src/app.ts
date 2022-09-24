import express from "express"
import handleAppErrorMiddleware from "./middlewares/handleAppError.middleware";
import appRoutes from "./routers";
import "express-async-errors"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"


const app = express()

app.use(express.json())

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

appRoutes(app)

app.use(handleAppErrorMiddleware)


export default app;