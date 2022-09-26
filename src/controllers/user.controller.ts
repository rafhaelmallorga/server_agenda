import { Request, Response } from "express";
import UserServices from "../services/user.service";
import { instanceToPlain } from "class-transformer";
import 'express-async-errors'

class UserControllers {
    static async create (req: Request, res: Response) {
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body
        
        const newUser = await UserServices.createUser({
            first_name,
            last_name,
            email,
            password
        })
        
        return res.status(201).json(instanceToPlain(newUser))

    }

    static async login (req: Request, res: Response) {
        const {email, password} = req.body
        const token = await UserServices.login({email, password})

        return res.status(200).json(token)
    }

    static async retrieve (req: Request, res: Response) {
        const id = req.user.id;
        const user = await UserServices.retrieve(id);

        return res.status(200).json(instanceToPlain(user))
    }

    static async update (req: Request, res: Response) {
        const id = req.user.id
        const userUpdated = await UserServices.update(id, req.body)

        return res.status(200).json(instanceToPlain(userUpdated))
    }

    static async delete (req: Request, res: Response) {
        const id = req.user.id
        await UserServices.delete(id)

        return res.status(204).json({message: 'User deleted!'})
    }

}

export default UserControllers