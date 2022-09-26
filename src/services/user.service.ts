import { AppDataSource } from "../data-source";
import { AppError } from "../errors/AppError";
import { User } from "../entities/user.entity";
import { IUserCreate, IUserLogin } from "../interfaces/user";
import bcrypt, { compare } from 'bcrypt';
import jwt from "jsonwebtoken";
import 'dotenv/config';


class UserServices {
    static async createUser({
        first_name,
        last_name,
        email,
        password
    }:IUserCreate) {
        const userRepository = AppDataSource.getRepository(User)
        
        const users = await userRepository.find()

        const userAlreadyExists = users.find(user => user.email === email)

        if (userAlreadyExists) {
            throw new AppError(409, 'E-mail already exists!')
        }

        const newUser = new User();
        newUser.first_name = first_name;
        newUser.last_name = last_name;
        newUser.email = email;
        newUser.password = bcrypt.hashSync(password, 10)

        const createdUser = userRepository.create(newUser)
        await userRepository.save(createdUser)

        return createdUser
    }

    static async login ({email, password}: IUserLogin) {
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOne({
            where: {
                email
            }
        })

        if(!user) {
            throw new AppError(403, 'Invalid credentials')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError(403, 'Invalid credentials')
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            String(process.env.SECRET_KEY),
            {
                expiresIn: '12h'
            }
        )

        return { token }
    }

    static async retrieve(id: string) {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({where: {id}})

        if (!user) {
            throw new AppError(404, 'User not found')
        }

        return user
    }

    static async update(id: string, data: IUserCreate) {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({where: {id}})

        if (!user) {
            throw new AppError(404, 'User not found')
        }

        const userUpdated = await userRepository.update(user!.id, data)

        if (userUpdated.affected === 1) {
            const updated = await userRepository.findOneBy({id: id})
            return updated
        }
    }

    static async delete(id: string) {
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOne({where: {id}})

        if (!user) {
            throw new AppError(404, 'User not found')
        }

        await userRepository.delete(user!.id)

        return true
    }
}

export default UserServices