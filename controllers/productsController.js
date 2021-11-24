import Menu from "../models/menu";
import CustomErrorHandler from "../services/CustomErrorHandler";
import {DEBUG_MODE} from "../config";

const productsController ={
    async getMenu(req, res, next){
        let document;
        try{
            document = await Menu.find().sort({_id: -1});
        }
        catch(err){
            if(DEBUG_MODE === 'true')console.log(`fromproductController.getMenu`,err);
            return next(CustomErrorHandler.serverError());
        }

        return res.json(document);
    },

    async getProduct(req, res, next){
        let document;
        try{
            document = await Menu.find({_id: req.params.id});
        }
        catch(err){
            if(DEBUG_MODE === 'true')console.log(`fromproductController.getProduct`,err)
            return next(CustomErrorHandler.serverError());
        }

        return res.json(document);
    }
}  

export default productsController;