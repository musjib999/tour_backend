import { print } from "../settings";
import { reduceImageSize } from "./imageHelper";



export async function imageResizer(file: Express.Multer.File, id: string, ext: string): Promise<string[]> {
    let tempPath: string[] = [];
    const qualites = [
        1024,
        500,
        250,
    ];
   const resizedImage = qualites.map(async (size) => {
        if (size == 0) {
            print('Do not process!!');
            await reduceImageSize(file.path, id, ext, size).then((value)=> {
                tempPath.push(value); 
            });
           
        } else {
            await reduceImageSize(file.path, id, ext, size).then((value)=> {
                tempPath.push(value); 
            });
        }
    });
    await Promise.all([...resizedImage]);
    print(`imageResizer Temp Path >>> ${tempPath}`);
    return tempPath;
}



