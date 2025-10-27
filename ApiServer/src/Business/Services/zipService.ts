import JSZip from 'jszip';
import fs from 'fs/promises';
import path from 'path';

export const ZipService = {
  async createChecklistZip(files: any, checklistId: number): Promise<string> {
    const zip = new JSZip();
    const timestamp = new Date().getTime();
    
    const motorFolder = zip.folder('motor');
    const pneusFolder = zip.folder('pneus');
    const geraisFolder = zip.folder('gerais');

    if (files.foto_motor && files.foto_motor.length > 0) {
      const fileBuffer = await fs.readFile(files.foto_motor[0].path);
      motorFolder?.file(files.foto_motor[0].originalname, fileBuffer);
    }

    if (files.foto_troca_oleo && files.foto_troca_oleo.length > 0) {
      const fileBuffer = await fs.readFile(files.foto_troca_oleo[0].path);
      motorFolder?.file(files.foto_troca_oleo[0].originalname, fileBuffer);
    }

    if (files.fotos_pneus && files.fotos_pneus.length > 0) {
      for (const file of files.fotos_pneus) {
        const fileBuffer = await fs.readFile(file.path);
        pneusFolder?.file(file.originalname, fileBuffer);
      }
    }

    if (files.fotos_gerais && files.fotos_gerais.length > 0) {
      for (const file of files.fotos_gerais) {
        const fileBuffer = await fs.readFile(file.path);
        geraisFolder?.file(file.originalname, fileBuffer);
      }
    }

    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 }
    });

    const uploadsDir = path.join(__dirname, '../../../uploads/checklists');
    try {
      await fs.access(uploadsDir);
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true });
    }

    const zipFileName = `checklist_${checklistId}_${timestamp}.zip`;
    const zipFilePath = path.join(uploadsDir, zipFileName);
    
    await fs.writeFile(zipFilePath, zipBuffer);

    return zipFilePath;
  },

  async cleanupIndividualFiles(files: any) {
    try {
      const allFiles = [
        ...(files.foto_motor || []),
        ...(files.foto_troca_oleo || []),
        ...(files.fotos_pneus || []),
        ...(files.fotos_gerais || [])
      ];

      for (const file of allFiles) {
        await fs.unlink(file.path).catch(console.error);
      }
    } catch (error) {
      console.error('Erro ao limpar arquivos individuais:', error);
    }
  }
};