import { storage, print, bucket, timestamp } from "../../settings";
import { uploadToTempDir } from "../../helpers/uploadHelper";
import { reduceImageSize } from "../../helpers/imageHelper";
import { uploadImage } from "../storage";
import { PlaceController } from "../db/placesController";
import { PlaceModel } from "../models";

exports.generateThumbnail = storage.object().onFinalize(async (image) => {
    const filePath = image.name;
    const imageMeta: any = image.metadata!.imageInfo;
    const fileName: string = imageMeta.name;
    if (!fileName.includes('-original') || imageMeta.type != 'original') {
        print(false.toString());
    } else {
        const tmpFilePath = uploadToTempDir(imageMeta.id, imageMeta.ext, 500);
        await bucket.file(filePath!).download({
            destination: tmpFilePath,
            validation: false,
        });
        const reduceImage = await reduceImageSize(tmpFilePath, imageMeta.id, imageMeta.ext, 720);
        const reducedImageName = reduceImage.split('/').pop();
        const meta = {
            ext: imageMeta.ext,
            name: reducedImageName,
            type: 'thumbnail',
            id: imageMeta.id,
            info: imageMeta.info,
        }
        const thumbnail = await uploadImage(reduceImage, `places/${imageMeta.id}/${reducedImageName}`, meta, imageMeta.id);
        const originalImage = thumbnail!.replace('thumbnail', 'original');
        const place: PlaceModel = {
            name: imageMeta.info.name,
            state: imageMeta.info.state,
            description: imageMeta.info.description,
            position: {
                latitude: imageMeta.info.position.latitude,
                longitude: imageMeta.info.position.longitude
            },
            image: originalImage,
            thumbnail: thumbnail!,
            createdAt: timestamp(),
            updatedAt: timestamp(),
        } as PlaceModel;
        await PlaceController.addPlace(place);
    }
});