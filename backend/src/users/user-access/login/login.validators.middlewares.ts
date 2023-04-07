import { Schema } from 'express-validator';

export const validateLogin: Schema = {
    email: {
        notEmpty: {
            errorMessage: 'O campo email é obrigatório',
            bail: true,
        },
    },
    password: {
        notEmpty: {
            errorMessage: 'O campo senha é obrigatório',
            bail: true,
        },
    },
};
