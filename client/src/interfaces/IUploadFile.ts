import type { UploadFile } from 'element-plus';

export interface IUploadFile extends Omit<UploadFile, 'uid'> {
  uid: string | number;
  isDownloaded?: boolean
}
