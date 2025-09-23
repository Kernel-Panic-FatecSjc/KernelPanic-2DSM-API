import { Request, Response } from "express";
import {ClienteService} from "../../Business/Services/ClienteService"

export const criarCliente = async (req: Request,res: Response) =>{
    const body = req.body
    const clienteService = new ClienteService()
    try{
        if(!await clienteService.criarCliente(body)){
            return res.status(404).send({message : "Deu ruim"})
        }
        return res.status(200).send({message : "Cliente criado com sucesso"})
    }
    catch(error){
        console.error(error)
        return res.status(400).send({message : "Não foi possivel criar o Cliente"})
    }
    res.json({ message: "deu bom" })
}