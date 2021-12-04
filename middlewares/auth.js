import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async(req, res, next) =>{
    let authHeader = req.headers.authorization;
    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized());
    }

    const token = authHeader.split(" ")[1];
    //console.log(token)
    try{
        const {_id} = await JwtService.verify(token);
        const user = {
            _id
        }

        req.user = user;
        next();
    }
    catch(err){
        // console.log(err)
        return next(CustomErrorHandler.unAuthorized("token invalid"));
    }
}

export default auth;