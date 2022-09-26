import { Router } from 'express'
import UserControllers from '../controllers/user.controller'

const routes = Router()

export const userRoutes = () => {
    routes.post('', UserControllers.create)
    routes.get('/me', UserControllers.retrieve)
    routes.patch('/me', UserControllers.update)
    routes.delete('me', UserControllers.delete)
}