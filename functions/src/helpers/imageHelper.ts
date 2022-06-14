import Jimp from "jimp";
import { print } from "../settings";

export const reduceImageSize = async (imagePath: string, name: string, ext: string, size: number): Promise<string> => {
  await (await Jimp.read(imagePath)).resize(size, size).writeAsync(imagePath);
  print(`[reduceImageSize] >> ${imagePath}`);
  return imagePath;
}