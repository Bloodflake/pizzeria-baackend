import Joi from "joi";
import bcrypt from "bcrypt";
import { RefreshToken, User } from "../models";
import JwtService from "../services/JwtService";
import CustomErrorHandler from "../services/CustomErrorHandler";
import {REFRESH_KEY} from "../config"

const registerController = {
    async register(req, res, next){

        
        const userInfo = req.body
        

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().error((error) => {
                error.forEach((err)=>{
                    err.message = "Invalid password"
                })
                return error;
            })
        });

        const {error} = registerSchema.validate(userInfo);
        if(error){
            return next(error);
        }

        try{
            const user = await User.find({email: userInfo.email});
            // console.log(user)
            if(user.length){
                return next(CustomErrorHandler.alreadyExist("Email is taken"));
            }
        }
        catch(err){
            return next(err);
        }

        const {name, email, password} = userInfo;

        let hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        let access_token;
        let refresh_token;

        try{
            const result = await user.save();

            // console.log(result);
            access_token = JwtService.sign({_id: result._id});
            refresh_token = JwtService.sign({_id: result._id}, '1y', REFRESH_KEY);
            await RefreshToken.create({token: refresh_token});

        }catch(err){
            return next(err);
        }

        return res.json({access_token, refresh_token})
    }
}

export default registerController;