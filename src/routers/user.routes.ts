import { Router } from 'express'
import { authUser } from '../middleware/authToken.middleware'
import UserControllers from '../controllers/user.controller'

const routes = Router()

export const userRoutes = () => {
    routes.post('', UserControllers.create)
    routes.get('/me', authUser, UserControllers.retrieve)
    routes.patch('/me', authUser, UserControllers.update)
    routes.delete('me', authUser, UserControllers.delete)

    return routes
}