//Error Handling is used to avoid try catch blocks and to avoid more lines

class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode

       // Error.stackTraceLimit(this,this.constructor)   
    }
    
}

module.exports = ErrorHandler