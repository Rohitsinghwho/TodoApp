class apiError extends Error{

    constructor(statusCode,messgae="Something went Wrong!!",errors=[]){
        super(messgae);
        this.statusCode = statusCode;
        this.data=null,
        this.errors=errors,
        this.success=false
    }
}


export {apiError}