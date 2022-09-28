import { Request, Response } from "express";
import ejs from "ejs"
import path from "path";
import pdf from "html-pdf"
import puppeteer from "puppeteer"
import ClientsServices from "../services/client.service";
import "dotenv/config"

class ClientsControllers {
    static async create(req: Request, res: Response) {
        const {
            full_name,
            email,
            phone
        } = req.body

        const newClient = await ClientsServices.createClientService({
            full_name,
            email,
            phone
        })

        return res.status(201).json(newClient)
    }

    static async list(req: Request, res: Response) {
        const clients = await ClientsServices.listClientsService()

        return res.status(200).json(clients)
    }

    static async retrieve(req: Request, res: Response) {
        const id = req.params.id
        const client = await ClientsServices.retrieveClientService(id)

        return res.status(200).json(client)

    }

    static async update(req: Request, res: Response) {
        const id = req.params.id
        const clientUpdated = await ClientsServices.updateClientService(id, req.body)

        return res.status(200).json(clientUpdated)
    }

    static async delete(req: Request, res: Response) {
        const id = req.params.id

        await ClientsServices.deleteClientService(id)

        return res.status(204).json({message: "Client deleted with success."})
    }

    static async generateReport(req: Request, res: Response) {
        const data = await ClientsServices.generateReport()
     
        const filePath = path.join(__dirname, '../', 'report', 'report.ejs')

        console.log(__dirname)

        ejs.renderFile(
            filePath,
            {
                contactsArray: data.reportData,
                clientArray: data.clients

            },
            (err, data) => {
                if (err) {
                    return res.status(400).json({message: "Error during document reading."})
                }

                return res.status(200).send(data)
            }
        )

    }

    static async generatePDFReport (req: Request, res: Response) {
        const browser = await puppeteer.launch({args: ['--no-sandbox']})
        const page = await browser.newPage()

        await page.goto(`https://api-agenda-typescript.herokuapp.com/report/clients`, {
            waitUntil: 'networkidle0'
        })

        const pdf = await page.pdf({
            printBackground: true,
            format: 'Letter'
        })

        await browser.close()

        res.contentType("application/pdf")

        return res.send(pdf)
    }
}

export default ClientsControllers