const AppErrors=require('./error-handler');
const {StatusCodes}=require('http-status-codes');
class ValidationError extends AppErrors{
    constructor(error)
    {
        let errorName=error.name;
        let expaination=[];
        error.errors.forEach((err) => {
            expaination.push(err.message);
        });
        super(
            errorName,
            'Not able to validate data sent in the request',
            expaination,
          StatusCodes.BAD_REQUEST
        )
    }
}
module.exports=ValidationError;