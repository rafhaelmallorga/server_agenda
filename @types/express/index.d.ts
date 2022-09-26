import * as express from "express"
import { IUserCreate } from "../../src/interfaces/user";

declare global {
    namespace Express {
        interface Request {
            user: {
                email: string;
                id: string;
            }

            newUser?: IUserCreate;
        }

        interface Response {
            user: {
                email: string;
                id: string;
            }
        }
    }
}