import "reflect-metadata";
import express from "express";
import cors from "cors"; 
import dotenv from "dotenv"; 
import { iniciarCron } from "./API/Jobs/emailCron"; 
const eventoRoute = require("./API/Routes/eventoEmailRoutes"); 

dotenv.config();

const calendarioRoute = require("./API/Routes/calendarioRoutes"); 
const funilVendasRoute = require("./API/Routes/funilVendasRoutes");
const clientesRoute = require("./API/Routes/clientesRoutes");
const gestaoRoute = require("./API/Routes/gestaoRoutes")
const historicoRoute = require("./API/Routes/historicoRoutes")
const vendedorRoute = require("./API/Routes/VendedorRoutes")


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
app.use("/formularios", )

app.get("/", (req, res) => {
  res.send("API funcionando");
});



export default app; 