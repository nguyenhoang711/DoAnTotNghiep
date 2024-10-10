'use strict'

// const StatusCode = {
//     FORBIDDEN: 403,
//     CONFLICT: 409,
// }

// const ReasonStatusCode = {
//     FORBIDDEN: 'Bad request error',
//     CONFLICT: 'Conflict error',
// }

const {
    StatusCodes,
    ReasonPhrases
} = require('../utils/httpStatusCode')

class ErrorResponse extends Error{
    //chi ke thua message va status
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse{
    constructor(message = ReasonPhrases.CONFLICT, status=StatusCodes.CONFLICT){
        super(message, status)
    }
}

class BadRequestError extends ErrorResponse{
    constructor(message = ReasonPhrases.BAD_REQUEST, status=StatusCodes.BAD_REQUEST){
        super(message, status)
    }
}

class AuthFailureError extends ErrorResponse{
    constructor(message = ReasonPhrases.FORBIDDEN, status=StatusCodes.FORBIDDEN){
        super(message, status)
    }
}

class NotFoundError extends ErrorResponse{
    constructor(message = ReasonPhrases.NOT_FOUND, status=StatusCodes.NOT_FOUND){
        super(message, status)
    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError,
    NotFoundError,
    AuthFailureError,
    ErrorResponse
}