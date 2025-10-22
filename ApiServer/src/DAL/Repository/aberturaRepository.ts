import mysql, { ResultSetHeader } from "mysql2/promise";
import { aberturaModel } from "../Models/aberteuraModel";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "newe_logistica",
});

export const aberturaRepository = {
  async create(abertura: aberturaModel) {
    const model = new aberturaModel(abertura);

    const query = `
      INSERT INTO abertura (
        qmPreenchendo, dataAberturaEmpresa, abriuEmpresa, abriuPortaoSocial, 
        abriuPortaRolante, desbloqueouAlarme, apagouLuzesArmazem, acendeuLuzesOperacional, 
        ligouArCondicionado, ligouTVCameras, ligouTVDashBoard, coletouChavesChaveiro,
        abriuPortaBanheiro, removeuCadeadoPortao1, removeuCadeadoPortao2, 
        colocouConeEstacionamentoPCD, ligouTomadaTirouPlasticoBebedouro,
        colocouTapetesDevidosLugares, fezCafe, observacao
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      model.qmPreenchendo,
      model.dataAberturaEmpresa,
      model.abriuEmpresa,
      model.abriuPortaoSocial,
      model.abriuPortaRolante,
      model.desbloqueouAlarme,
      model.apagouLuzesArmazem,
      model.acendeuLuzesOperacional,
      model.ligouArCondicionado,
      model.ligouTVCameras,
      model.ligouTVDashBoard,
      model.coletouChavesChaveiro,
      model.abriuPortaBanheiro,
      model.removeuCadeadoPortao1,
      model.removeuCadeadoPortao2,
      model.colocouConeEstacionamentoPCD,
      model.ligouTomadaTirouPlasticoBebedouro,
      model.colocouTapetesDevidosLugares,
      model.fezCafe,
      model.observacao,
    ];

    const [result] = await pool.query<ResultSetHeader>(query, values);

    console.log("Resultado do INSERT:", result);

    return { id: result.insertId, ...model };
  },

  async findAll() {
    const [rows] = await pool.query("SELECT * FROM abertura");
    return rows;
  },
};
