import { Schema } from 'express-validator';

export const validateRegisterMarker: Schema = {
    userId: {
        notEmpty: {
            errorMessage: 'O campo userId é obrigatório',
            bail: true,
        },
    },
    status: {
        notEmpty: {
            errorMessage: 'O campo status é obrigatório',
            bail: true,
        },
    },
    title: {
        notEmpty: {
            errorMessage: 'O campo título é obrigatório',
            bail: true,
        },
        isLength: {
            options: { max: 50 },
            errorMessage: 'Título deve ter no máximo 50 caracteres',
        },
    },
    start_date: {
        optional: true,
        isISO8601: {
            errorMessage: 'O campo de data de ida deve estar no formato ISO8601',
            bail: true,
        },
    },
    end_date: {
        optional: true,
        isISO8601: {
            errorMessage: 'O campo de data de volta deve estar no formato ISO8601',
            bail: true,
        },
    },
    lat: {
        notEmpty: {
            errorMessage: 'O campo latitude é obrigatório',
            bail: true,
        },
        isNumeric: {
            errorMessage: 'O campo latitude deve ser um número',
            bail: true,
        },
    },
    lng: {
        notEmpty: {
            errorMessage: 'O campo longitude é obrigatório',
            bail: true,
        },
        isNumeric: {
            errorMessage: 'O campo longitude deve ser um número',
            bail: true,
        },
    },
};
