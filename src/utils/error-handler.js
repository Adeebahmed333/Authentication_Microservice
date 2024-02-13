const {StatusCodes}=require('http-status-codes');
class AppErrors extends Error{
    constructor(name='App Error',
    message="Something Went Wrong",
    explaination="Something Went Wrong",
    statusCode=StatusCodes.INTERNAL_SERVER_ERROR
    )
    {
        super();
     this.name=name;
     this.message=message;
     this.explaination=explaination;
     this.statusCode=statusCode;
    }

}
module.exports=AppErrors