import Jimp from "jimp";
import { uploadToTempDir } from "./uploadHelper";

export const reduceImageSize = async (imagePath: string, id: string, ext: string, size: number): Promise<string> => {
  let tmpFilePath = uploadToTempDir(id, ext, size);
  await Jimp.read(imagePath).then((image) => {
    image.resize(size, size).writeAsync(tmpFilePath);  
  });
  return tmpFilePath;
}