import { Schema } from 'express-validator';

export const validateRegisterUser: Schema = {
    email: {
        notEmpty: {
            errorMessage: 'O campo email é obrigatório',
            bail: true,
        },
        isEmail: {
            errorMessage: 'Deve ser inserido um email válido',
        },
    },
    name: {
        notEmpty: {
            errorMessage: 'O campo nome é obrigatório',
            bail: true,
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Nome deve ter no minimo 5 caracteres',
        },
    },
    birthdate: {
        notEmpty: {
            errorMessage: 'O campo data de nascimento é obrigatório',
            bail: true,
        },
        isDate: {
            errorMessage: 'O campo data de nascimento deve ser uma data',
            bail: true,
        },
    },
    password: {
        notEmpty: {
            errorMessage: 'O campo senha é obrigatório',
            bail: true,
        },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Senha deve ter no minimo 5 caracteres',
        },
    },
    confirmPassword: {
        notEmpty: {
            errorMessage: 'O campo confirmar senha é obrigatório',
            bail: true,
        },
        custom: {
            options: (value, { req }) => value === req.body.password,
            errorMessage: 'Senhas não são iguais',
        },
    },
};
