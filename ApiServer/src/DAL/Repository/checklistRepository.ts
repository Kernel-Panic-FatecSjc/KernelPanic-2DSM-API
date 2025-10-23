import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "api2dsm",
});

export const checklistRepository = {
  async create(data: { tipo: string; respostas: string; path_img: string | null }) {
    const query = `
      INSERT INTO ChecklistFuncionario (tipo, respostas, path_img)
      VALUES (?, ?, ?)
    `;
    const [result]: any = await pool.query(query, [
      data.tipo,
      data.respostas,
      data.path_img,
    ]);
    return { id: result.insertId, ...data };
  },

  async findAll() {
    const [rows] = await pool.query("SELECT * FROM ChecklistFuncionario");
    return rows;
  },

  async findByTipo(tipo: string) {
    const [rows] = await pool.query("SELECT * FROM ChecklistFuncionario WHERE tipo = ?", [tipo]);
    return rows;
  },
};