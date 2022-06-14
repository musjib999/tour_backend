import { baseUrl, bucket, print } from "../../settings";

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
        });
    } catch (error) {
       print(`[uploadImage] Error >>> ${error}`);
    }
    return imageUrl;
}