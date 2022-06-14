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
}