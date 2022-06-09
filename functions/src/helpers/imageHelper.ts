import Jimp from "jimp/*";
import { print } from "../settings";

const jimp = require("jimp");
// const Jimp = require("jimp");

export const reduceImageQuality = async (imagePath: string, id: string, ext: string, quality: number): Promise<string> => {
  let path: string = '';
  await jimp.read(imagePath).then((image: any) => {
    const uploadPath: string = `uploads/${id}.${ext}`;
    image.quality(quality).writeAsync(__dirname.split('/functions')[0] + '/functions/' + uploadPath).then((value: Jimp) => {
      path = __dirname.split('/functions')[0] + '/functions/' + uploadPath;
      print(value.toString());
     
    });
    path = __dirname.split('/functions')[0] + '/functions/' + uploadPath;
  });
  return path;
}