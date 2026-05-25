import { CreateUserUseCase } from '../use-cases/create-user.js';
import validator from 'validator';
import { HttpHelper } from './helpers/http.js';
export class CreateUserController {
    async execute(request) {
        try {
            const reqBody = request.body;

            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];
            for (const field of requiredFields) {
                if (!reqBody[field] || reqBody[field].trim() === '') {
                    return HttpHelper.badRequest({
                        message: `O campo ${field} é obrigatório.`,
                    });
                }
            }

            const passwordIsValid = reqBody.password.length >= 6;
            if (!passwordIsValid) {
                return HttpHelper.badRequest({
                    message: 'A senha deve ter no mínimo 6 caracteres.',
                });
            }

            const emailIsValid = validator.isEmail(reqBody.email);
            if (!emailIsValid) {
                return HttpHelper.badRequest({
                    message: 'O email é inválido.',
                });
            }

            // chamar o caso de uso para criar o usuário
            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(reqBody);

            return HttpHelper.created({
                message: 'Usuário criado com sucesso!',
                data: createdUser,
            });
        } catch (error) {
            console.error('Ocorreu um erro ao criar o usuário:', error);

            return HttpHelper.serverError(
                'Ocorreu um erro ao criar o usuário.',
            );
        }
    }
}
