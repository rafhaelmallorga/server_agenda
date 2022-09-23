import { Router } from "express";


const routes = Router();

export const clientsRoutes = () => {
    routes.get('', () => console.log('create client'));

    return routes
    
}