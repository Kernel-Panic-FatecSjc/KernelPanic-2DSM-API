// checklistAgregadoRepository.ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "MATPET2007a@",
  database: "api2dsm",
});

export const checklistRepository = {
  async create(data: { tipo: string; respostas: string; path_img: string | null }) {
    const query = `
      INSERT INTO ChecklistAgregado (tipo, respostas, path_img)
      VALUES (?, ?, ?)
    `;
    const [result]: any = await pool.execute(query, [
      data.tipo,
      data.respostas,
      data.path_img,
    ]);
    return { id: result.insertId, ...data };
  },

  async updateZipPath(id: number, zipPath: string) {
    const query = `
      UPDATE ChecklistAgregado 
      SET path_img = ?
      WHERE check_agre_ID = ?
    `;
    await pool.execute(query, [zipPath, id]);
    return this.findById(id);
  },

  async findById(id: number): Promise<any> {
    const [rows]: any = await pool.execute(
      "SELECT * FROM ChecklistAgregado WHERE check_agre_ID = ?", 
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  },

  async findAll() {
    const [rows] = await pool.execute("SELECT * FROM ChecklistAgregado");
    return rows;
  },

  async findByTipo(tipo: string) {
    const [rows] = await pool.execute(
      "SELECT * FROM ChecklistAgregado WHERE tipo = ?", 
      [tipo]
    );
    return rows;
  },
};