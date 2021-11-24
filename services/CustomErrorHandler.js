class CustomErrorHandler  extends Error{
    constructor(status, msg){
        super();
        this.status = status;
        this.message = msg;
    }

    static serverError(message = "Internal server error"){
        return new CustomErrorHandler(500, message);
    }
}

export default CustomErrorHandler;