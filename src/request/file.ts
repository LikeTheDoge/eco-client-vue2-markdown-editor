import { ERequest } from "e-request";
import { FileInfo, FolderInfo, ProjectInfo } from "../models/base";
import { fromJson } from 'e-model'

const plat = new ERequest('/eco-plat-static-server')

export const getFileInfoById = (id: string) => plat.get(`/file/getFileById/${id}`, null)
    .then(data => fromJson(FileInfo, data))

export const saveFileContent = (fileId: string, content: string, remark: string) => plat.post(`/file/saveFile`, {
    "id": fileId, "recordContent": remark, "txt": content
})