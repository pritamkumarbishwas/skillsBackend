import httpStatus from "http-status";
import Joi from "joi";
import { ApiResponse } from "../utils/ApiResponse.js";

const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
};


const customJoi = Joi.extend((joi) => ({
    type: 'stringArray',
    base: Joi.array(),
    coerce(value) {
        return { value: value.split ? value.split(',') : value }
    },
}))

const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        const extractedErrors = error.details.map(err => ({ [err.path[0]]: err.message }));
        return res.status(httpStatus.BAD_REQUEST).json(new ApiResponse(httpStatus.BAD_REQUEST, null, extractedErrors));
    }
    next();
};

export {
    objectId,
    customJoi,
    validateRequest
}