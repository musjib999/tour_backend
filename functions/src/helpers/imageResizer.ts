// import { print } from "../settings";
// import { reduceImageSize } from "./imageHelper";



// export async function imageResizer(file: Express.Multer.File, id: string, ext: string): Promise<string[]> {
//     let tempPath: string[] = [];
//     const qualites = [
//         0,
//         500,
//         250,
//     ];
//     await Promise.all(qualites.map(async (size) => {
//         if (size == 0) {
//             print('Do not process!!');
//             // await reduceImageSize(file.path, id, ext, size).then((value)=> {
//             //     tempPath.push(value); 
//             // });

//         } else {
//             await reduceImageSize(file.path, id, ext, size).then((value) => {
//                 tempPath.push(value);
//             });
//         }
//     }));
//     print(`[imageResizer](3) >> ${tempPath}`);
//    return await Promise.resolve(tempPath);
// }



