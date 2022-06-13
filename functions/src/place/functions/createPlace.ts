const multer = require("multer-firebase");
import express = require("express");
import { v4 as uuidv4 } from 'uuid';
import { https, print } from "../../settings";
import { uploadImage } from "../storage";
//jimp, firebase

const storage = multer.diskStorage({})
const upload = multer({ storage: storage });

const app = express();

app.post('/', upload.single('image'), async (req, res, next) => {
    if (req.file) {
        try {
            let id: string = uuidv4();
            const ext = req.file.originalname.split('.').pop();
            const meta = {
                ext: ext,
                name: `${id}-original.${ext}`,
                type: 'original',
                id: id,
            }
            const imageUrl = await uploadImage(req.file.path, `places/${id}/${id}-original.${ext}`, meta, id);
            const image = { image: imageUrl };
            res.status(200).json({ status: 'success', payload: image, message: 'Image uploaded successful' })

        } catch (error) {
            print(`[uploadPlace] Error => ${error} `);
            res.status(500).json({ status: 'failed', payload: null, message: `Failed to uploaded image ==> ${error}` });
        }
    } else {
        res.status(500).json({ status: 'failed', payload: null, message: 'Please Upload a file' });
    }
});



exports.uploadPlace = https.onRequest(app);