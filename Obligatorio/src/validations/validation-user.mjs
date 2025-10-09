import Joi from "joi"


export const validateAuth = Joi.object({
    id: Joi.string().required(),
    email: Joi.string().regex(/.+@.+\..+/).required(),
    iat: Joi.number().integer(),
    perfil: Joi.array(),
    exp: Joi.date()
});

export const validateSingup = Joi.object({
    name: Joi.string().min(2).max(40).required(),
    email: Joi.string().regex(/.+@.+\..+/).required(),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)
        .required()
        
});


export const validateLogin = Joi.object({
    email: Joi.string().regex(/.+@.+\..+/).required(),
    password: Joi.string().min(8).required() // Para login, solo verificamos longitud mínima
});