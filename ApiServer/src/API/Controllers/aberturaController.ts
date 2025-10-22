import { aberturaService } from "../../Business/Services/aberturaService";

export const AberturaController = {
    async create(req,res){
        try {
            const data = req.body
            const result = await aberturaService.createAbertura(data);
            res.status(201).json({message: "Abertura Registrada!", result});
        }catch (err){
            if(err instanceof Error)
            res.status(400).json({error: err.message});
        }
    },

    async getAll(req,res){
        try {
            const result = await aberturaService.getAllAberturas()
            res.status(200).json(result);
        }catch (err) {
            if(err instanceof Error)
            res.status(500).json({error : err.message});
        }
    },
};