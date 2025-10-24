import "reflect-metadata";
import express from "express";
import cors from "cors"; 
import dotenv from "dotenv"; 
import { iniciarCron } from "./API/Jobs/emailCron"; 
const eventoRoute = require("./API/Routes/eventoEmailRoutes"); 

dotenv.config();

const AuthRoutes = require("./API/Routes/AuthRoutes"); 
const calendarioRoute = require("./API/Routes/calendarioRoutes"); 
const funilVendasRoute = require("./API/Routes/funilVendasRoutes");
const clientesRoute = require("./API/Routes/clientesRoutes");
const gestaoRoute = require("./API/Routes/gestaoRoutes")
const historicoRoute = require("./API/Routes/historicoRoutes")
const vendedorRoute = require("./API/Routes/VendedorRoutes")
const funcionarioPerfilRoutes = require("./API/Routes/FuncionarioPerfilRoutes")
const funcionarioRoutes = require("./API/Routes/FuncionarioRoutes")


const app = express(); 

app.use(cors()); 
app.use(express.json()); 

import { AppDataSource } from "./DAL/ormconfig";


AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado ao MySQL com sucesso!");
  })
  .catch((err: Error) => {
    console.error(err, "❌ Erro ao conectar ao MySQL, VERIFIQUE SE O .ENV ESTA CONFIGURADO CORRETAMENTE!!!:");
  });

app.use("/login", AuthRoutes)
app.use("/funilVendas",funilVendasRoute )
app.use("/calendario", calendarioRoute)
app.use("/clientes", clientesRoute)
app.use("/vendedor", vendedorRoute)
app.use("/historico",historicoRoute)
app.use("/gestao",gestaoRoute)

app.use("/eventos", eventoRoute);
iniciarCron();
app.use("/funilVendas", funilVendasRoute); 
app.use("/calendario", calendarioRoute); 
app.use("/api/funcionarios", funcionarioPerfilRoutes);
app.use("/funcionario", funcionarioRoutes)

app.get("/", (req, res) => {
  res.send("API funcionando");
});


// No seu arquivo main.ts ou app.ts

import * as bcrypt from 'bcryptjs';



// ==========================================================
// ROTA DE UTILIDADE PARA GERAR HASHES DE SENHA (APENAS PARA DESENVOLVIMENTO)
// ==========================================================
app.get('/hash', async (req, res) => {
  // 1. Pega a senha da query string da URL (ex: /hash?senha=minhasenha)
  const senha = req.query.senha as string;

  // 2. Validação: verifica se a senha foi enviada
  if (!senha) {
    return res.status(400).json({
      error: "Parâmetro 'senha' não encontrado na URL.",
      exemplo: "/hash?senha=suaSenhaAqui",
    });
  }

  try {
    // 3. Gera o hash da senha com um custo de 10
    const hash = await bcrypt.hash(senha, 10);

    // 4. Retorna a senha original e o hash gerado
    return res.status(200).json({
      senhaPura: senha,
      hash: hash,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao gerar o hash.",
      detalhes: error,
    });
  }
});
// ==========================================================


// app.listen(3000, () => {
//   console.log('Servidor rodando na porta 3000');
// });


export default app; 