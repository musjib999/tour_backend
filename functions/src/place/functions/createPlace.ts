import * as functions from "firebase-functions";

const multer = require("multer-firebase");
import express = require("express");
import { uploadImage } from "../storage";
import { v4 as uuidv4 } from 'uuid';
// import { reduceImageQuality } from "../../helpers/imageHelper";
import { print } from "../../settings";
import { imageResizer } from "../../helpers/imageResizer";
//jimp, firebase

const storage = multer.diskStorage({})
const upload = multer({ storage: storage });

const app = express();

app.post('/', upload.single('image'), async (req, res, next) => {
    // let images: string[] = [];
    // const file = req.file;
    if (req.file) {
        try {
            let id: string = uuidv4();
            const ext = req.file.originalname.split('.').pop();
            await imageResizer(req.file, id, ext ?? 'jpg').then((paths: string[]) => {
                paths.forEach(async (path) => {
                    const filename: string = path.split('/')[path.split('/').length - 1];
                    const imageUrl = await uploadImage(path, `places/${filename.split('@')[0]}/${filename}`, id);
                    print(imageUrl!);
                });
            });
            res.status(200).json({ status: 'success', payload: req.file, message: 'Image uploaded successful' })

        } catch (error) {
            print(`[uploadPlace] Error => ${error} `);
            res.status(500).json({ status: 'failed', payload: null, message: `Failed to uploaded image ==> ${error}` });
        }
    } else {
        res.status(500).json({ status: 'failed', payload: null, message: 'Please Upload a file' });
    }
});



exports.uploadPlace = functions.region('us-central1').https.onRequest(app);