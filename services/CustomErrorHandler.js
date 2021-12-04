class CustomErrorHandler  extends Error{
    constructor(status, msg){
        super();
        this.status = status;
        this.message = msg;
    }

    static serverError(message = "Internal server error"){
        return new CustomErrorHandler(500, message);
    }

    static alreadyExist(message){
        return new CustomErrorHandler(409, message)
    }

    static wrongCredential(message = "Username or password is wrong!"){
        return new CustomErrorHandler(401, message);
    }

    static unAuthorized(msg = "Unauthorized resource"){
        return new CustomErrorHandler(401, msg);
    }
}

export default CustomErrorHandler;