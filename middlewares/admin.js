import {User} from "../models"
import JwtService from "../services/JwtService"
import CustomErrorHandler from "../services/CustomErrorHandler";

const admin = async(req, res, next)=>{
    try{
        const user = await User.findOne({_id: req.user._id});
        if(user.role === "admin"){
            next();
        }
        else{
            return next(CustomErrorHandler.unAuthorized("not authorize to acccess resource"))
        }
    }
    catch(err){
        return next(err);
    }
}

export default admin