
import { Request, Response } from "express";
import { ClienteService } from "../../Business/Services/ClienteService";

export const getClientes = async (req: Request, res: Response) => {
    const clienteService = new ClienteService();
    try {
        const clientes = await clienteService.listarTodos();
        
        if (clientes) return res.status(200).send({ message: clientes }); 
        
        return res.status(404).send({ message: "Nenhum cliente encontrado" });
    } catch (err) {
        return res.status(500).send({ message: "Erro ao buscar clientes" });
    }
};

export const criarCliente = async (req: Request, res: Response) => {
    const body = req.body;
    const clienteService = new ClienteService();
    try {
        const novoCliente = await clienteService.criarCliente(body);
        return res.status(201).send(novoCliente); // 201 Created é mais semântico
    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: "Não foi possivel criar o Cliente", error: error });
    }
};

export const updateCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body;
    const clienteService = new ClienteService();
    try {
        const clienteAtualizado = await clienteService.updateCliente(Number(id), body);
        
        return res.status(200).send(clienteAtualizado); 
    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: "Não foi possivel atualizar o Cliente", error: error });
    }
};

export const deleteCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    const clienteService = new ClienteService();
    try {
        const resultado = await clienteService.deleteCliente(Number(id));
        return res.status(200).send(resultado); // Envia a mensagem de sucesso
    } catch (error) {
        console.error(error);
        return res.status(404).send({ message: "Não foi possivel deletar o Cliente", error: error });
    }
};

export const atribuirContato = async (req: Request, res: Response) => {
    const body = req.body;
    const clienteService = new ClienteService();
    try {
        const novoContato = await clienteService.atribuirContato(body);
        return res.status(200).send({ message: "Contato atribuido com sucesso", contato: novoContato });
    } catch (error) {
        console.error(error);
        return res.status(400).send({ message: "Não foi possivel atribuir o Contato", error: error });
    }
};