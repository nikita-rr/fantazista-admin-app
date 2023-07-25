import { Injectable } from '@nestjs/common';
import { ContractFile } from '@prisma/client';
import { existsSync, unlinkSync, writeFileSync } from 'fs';

@Injectable()
export class ContractsFilesService {
  private targetPath = './uploads';

  saveFile(file: Express.Multer.File) {
    const filename = `${this.targetPath}/${Date.now()}_${file.originalname}`;
    writeFileSync(filename, file.buffer);
    return filename;
  }

  unlinkFile(file: ContractFile) {
    if (existsSync(file.target_path)) {
      unlinkSync(file.target_path);
    }
  }
}
