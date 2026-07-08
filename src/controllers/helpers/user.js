import validator from 'validator';
import { HttpHelper } from './http.js';

export const invalidPasswordResponse = () => {
    return HttpHelper.badRequest({
        message: 'A senha deve ter no mínimo 6 caracteres.',
    });
};

export const invalidEmailResponse = () => {
    return HttpHelper.badRequest({
        message: 'O email fornecido é inválido.',
    });
};

export const invalidIdResponse = () => {
    return HttpHelper.badRequest({
        message: 'O UUID do usuário é inválido.',
    });
};

export const checkIfPasswordIsValid = (password) => {
    return password.length >= 6;
};

export const checkIfEmailIsValid = (email) => {
    return validator.isEmail(email);
};
