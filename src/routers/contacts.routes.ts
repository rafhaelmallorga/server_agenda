import { Router } from "express";


const routes = Router();

export const contactsRoutes = () => {
    routes.get('', () => console.log('create contacts'));
    
    return routes
}