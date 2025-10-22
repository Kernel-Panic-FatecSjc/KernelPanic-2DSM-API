import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "newe_logistica",
});

export const ChecklistRepository = {
  async create(tipo: string, respostas: any, path_img?: string) {
    const query = `
      INSERT INTO ChecklistFuncionario (tipo, respostas, path_img)
      VALUES (?, ?, ?)
    `;
    const values = [tipo, JSON.stringify(respostas), path_img || null];

    const [result]: any = await pool.query(query, values);
    return { id: result.insertId, tipo, respostas, path_img };
  },

  async getAll() {
    const [rows] = await pool.query("SELECT * FROM ChecklistFuncionario");
    return rows;
  },

  async getByTipo(tipo: string) {
    const [rows] = await pool.query(
      "SELECT * FROM ChecklistFuncionario WHERE tipo = ?",
      [tipo]
    );
    return rows;
  },
};
