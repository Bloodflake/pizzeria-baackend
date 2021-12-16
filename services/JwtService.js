import jwt from "jsonwebtoken"
import {JWT_KEY} from "../config"

class JwtService{
    static sign(payload, expiry='30d', secret = JWT_KEY){
        return jwt.sign(payload, secret, {expiresIn: expiry});
    }
    
    static verify(token, secret = JWT_KEY){
        return jwt.verify(token , secret);
    }
}

export default JwtService;