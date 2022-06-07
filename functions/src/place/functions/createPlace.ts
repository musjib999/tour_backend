import * as functions from "firebase-functions";

const multer = require("multer-firebase");
import * as express from "express";
import { uploadImage } from "../storage";
import { v4 as uuidv4 } from 'uuid';

//jimp, firebase

const storage = multer.diskStorage({})
const upload = multer({ storage: storage });

const app = express();

app.post('/', upload.single('image'), async (req, res, next) => {
    if (req.file) {
        try {
            let id: string = uuidv4();
            const ext = req.file!.originalname.split('.').pop();
            await uploadImage(req.file.path, `places/${req.file.filename}/${req.file.filename}-full.${ext}`, id);
        } catch (error) {
            console.log(`[uploadPlace] Error => ${error} `);
            res.status(500).json({ status: 'failed', payload: null, message: `Failed to uploaded image ==> ${error}` });
        }
        res.status(200).json({ status: 'success', payload: req.file, message: 'Image uploaded successful' })
    } else {
        res.status(500).json({ status: 'failed', payload: null, message: 'Please Upload a file' });
    }
});



exports.uploadPlace = functions.region('us-central1').https.onRequest(app);