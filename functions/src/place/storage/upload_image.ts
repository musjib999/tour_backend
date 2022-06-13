import { baseUrl, bucket } from "../../settings";

export const uploadImage = async (filePath: string, destination: string, meta: {}, id: string): Promise<string | undefined> => {
    let imageUrl: string = '';
    try {
        await bucket.upload(filePath, {
            destination: destination,
            metadata: {
                cacheControl: 'public,max-age=300',
                metadata: {
                    firebaseStorageDownloadTokens: id,
                    imageInfo: meta,
                },
            },
        }).then((value) => {
            imageUrl = `${baseUrl}/${bucket.name}/o/${value[0].id}?alt=media&token=${id}`;
            console.log(imageUrl);
        });
    } catch (error) {
        console.log(error);
    }
    return imageUrl;
}