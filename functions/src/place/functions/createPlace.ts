import * as functions from "firebase-functions";

const multer = require("multer-firebase");
import * as express from "express";
import { uploadImage } from "../storage";
import { v4 as uuidv4 } from 'uuid';
import { reduceImageQuality } from "../../helpers/imageHelper";
import { print } from "../../settings";
//jimp, firebase

const storage = multer.diskStorage({})
const upload = multer({ storage: storage });

const app = express();

app.post('/', upload.single('image'), async (req, res, next) => {
    let images: string[] = [];
    // const file = req.file;
    if (req.file) {
        try {
            let id: string = uuidv4();
            const ext = req.file!.originalname.split('.').pop();

            await uploadImage(req.file.path, `places/${req.file.filename}/${req.file.filename}-full.${ext}`, id).then(async (originalImage) => {
                originalImage == undefined ? images : images.push(originalImage);
                res.status(200).json({ status: 'success', payload: images, message: 'Image uploaded successful' })
                await reduceImageQuality(req.file!.path, req.file!.filename, ext == undefined ? 'jpeg' : ext, 75).then(async(value) => {
                    console.log(value);
                    if (value == '') {
                        print(`[uploadPlace] Error trying to upload image`);
                        res.status(500).json({ status: 'failed', payload: null, message: 'Error trying to upload imag' });
                    } else {
                        print('Image reduced successfully');
                    //    await uploadImage(value, `places/${file!.filename}/${file!.filename}-normal.${ext}`, id);
                    }
                });
            });
        } catch (error) {
            print(`[uploadPlace] Error => ${error} `);
            res.status(500).json({ status: 'failed', payload: null, message: `Failed to uploaded image ==> ${error}` });
        }
    } else {
        res.status(500).json({ status: 'failed', payload: null, message: 'Please Upload a file' });
    }
});



exports.uploadPlace = functions.region('us-central1').https.onRequest(app);