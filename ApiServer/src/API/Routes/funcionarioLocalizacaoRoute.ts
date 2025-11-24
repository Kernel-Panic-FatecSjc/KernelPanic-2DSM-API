import {Router} from 'express';
import { FuncionarioLocalizacaoService } from '../../Business/Services/FuncionarioLocalizacaoService';

const router = Router();
const service = new FuncionarioLocalizacaoService();

router.put("/", async(req, res) => {
    try {
        const { funcionarioId, localizacao } = req.body;

         const result = await service.atualizarLocalizacao(
            Number(funcionarioId),
            localizacao
    );

    res.status(200).json(result);


    }catch(e:any){
        res.status(400).json({error: e.message});
    }
});


module.exports = router;
