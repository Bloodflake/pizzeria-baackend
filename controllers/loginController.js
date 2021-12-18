import Joi from "joi"
import bcrypt from "bcrypt"
import CustomErrorHandler from "../services/CustomErrorHandler";
import {REFRESH_KEY} from "../config"
import { RefreshToken, User } from "../models"
import JwtService from "../services/JwtService";

const loginController = {
    async login(req, res, next){
        const userInfo = req.body;

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })

        const {error} = loginSchema.validate(userInfo);
        if(error){
            return next(CustomErrorHandler.wrongCredential());
        }

        try{
            const user = await User.findOne({email: userInfo.email});
            //console.log(user);

            if(!user){
                return next(CustomErrorHandler.wrongCredential());
            }

            const match = await bcrypt.compare(userInfo.password, user.password);

            if(!match){
                return next(CustomErrorHandler.wrongCredential());
            }

            let access_token = JwtService.sign({_id: user._id});
            let refresh_token = JwtService.sign({_id: user._id}, '1y', REFRESH_KEY);

            await RefreshToken.create({token: refresh_token})
            return res.json({access_token, refresh_token})
        }catch(err){
            return next(err);
        }
    },
     async logout(req, res, next){
         const logoutSchema = Joi.object({
             refresh_token: Joi.string().required()
         })

         const {error} = logoutSchema.validate(req.body);

         if(error){
             return next(error)
         }

         try{
             await RefreshToken.deleteOne({token: req.body.refresh_token});
         }
         catch(err){
             return next(err);
         }

         return res.send("logout success")
     }
}


export default loginController;