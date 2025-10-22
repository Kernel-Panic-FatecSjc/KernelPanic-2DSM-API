import { aberturaRepository } from "../../DAL/Repository/aberturaRepository";

export const aberturaService = {
    async createAbertura(data){
        if(!data.qmPreenchendo || !data.dataAberturaEmpresa) {
            throw new Error("Campos obrigatórios faltando.")
        }
        return await aberturaRepository.create(data)
    },

    async getAllAberturas(){
        return await aberturaRepository.findAll()
    }
};