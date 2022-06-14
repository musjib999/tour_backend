import { https } from "../../settings";
import { PlaceController } from "../db/placesController";

exports.getAllPlace = https.onRequest(async(req, res) => {
    if (req.method == 'GET') {
        try {
           const places = await PlaceController.getAllPlace();
           res.status(200).json({status: 'success', payload: places, message: 'All places fetched successfully'})
        } catch (error) {
            res.status(500).json({status: 'failed', payload: null, message: `Cannot fetch all place ${error}`})
        }
    }else{
        res.status(405).json({status: 'failed', payload: null, message: 'Method not allowed'})
    }
});