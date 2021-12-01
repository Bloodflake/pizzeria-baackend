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

    async getSingleProduct(req, res, next){
        let document;
        try{
            document = await Menu.find({_id: req.params.id});
        }
        catch(err){
            if(DEBUG_MODE === 'true')console.log(`fromproductController.getSingleProduct`,err)
            return next(CustomErrorHandler.serverError());
        }

        return res.json(document);
    },

    async getProducts(req, res, next){
        let items = [];
        
        try{
            items = await Menu.find({_id: {$in: req.body.items}});
        }
        catch(err){
            if(DEBUG_MODE === 'true')console.log(`fromproductController.getProducts`,err);
            return next(CustomErrorHandler.serverError());
        }
        return res.json(items);
    }
}  

export default productsController;