import { db, print } from "../../settings";
import { PlaceModel } from "../models";

export class PlaceController {
    constructor() { }

    static async addPlace(place: PlaceModel): Promise<PlaceModel | undefined> {
        let addedPlace: PlaceModel | undefined;
        try {
            await db.collection('place').add(place);
            addedPlace = place;
            print(`[addPlace] Success >>> ${place}`);
        } catch (error) {
            print(`[addPlace] Error while adding place >>> ${error}`);
            addedPlace = undefined;
        }
        return addedPlace;
    }

    static async getAllPlace(): Promise<PlaceModel[]> {
        let allPlace: PlaceModel[] = [];
        try {
            const places = (await db.collection('place').get()).docs;
            places.map((place) => {
                const placeData = place.data();
                const placeModel: PlaceModel = {
                    name: placeData['name'],
                    state: placeData['state'],
                    position: {
                        longitude: placeData['position']['longitude'],
                        latitude: placeData['position']['latitude'],
                    },
                    description: placeData['description'],
                    image: placeData['image'],
                    thumbnail: placeData['thumbnail'],
                    createdAt: placeData['createdAt'],
                    updatedAt: placeData['updatedAt'],
                }
                console.log(placeModel);
                allPlace.push(placeModel);
            });
        } catch (error) {
            print(`[getAllPlace] Error while fetching place >>> ${error}`);
            allPlace = [];
        }
        print(`[getAllPlace] response >>> ${allPlace}`);
        return allPlace;
    }
}