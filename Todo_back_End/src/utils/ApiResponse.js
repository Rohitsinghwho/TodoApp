class apiResponse{
    //    private int code;
    //    private String msg;
    constructor(statusCode,data,msg="True"){
        this.statusCode=statusCode,
        this.success=statusCode<400
        this.data=data,
        this.message=msg
    }
}

export {apiResponse}