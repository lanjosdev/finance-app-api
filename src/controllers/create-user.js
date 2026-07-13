import { CreateUserUseCase } from '../use-cases/create-user.js';
import { EmailAlreadyExistsError } from '../errors/user.js';
import {
    HttpHelper,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    invalidEmailResponse,
    invalidPasswordResponse,
} from './helpers/index.js';

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

            const passwordIsValid = checkIfPasswordIsValid(reqBody.password);
            if (!passwordIsValid) {
                return invalidPasswordResponse();
            }

            const emailIsValid = checkIfEmailIsValid(reqBody.email);
            if (!emailIsValid) {
                return invalidEmailResponse();
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

            if (error instanceof EmailAlreadyExistsError) {
                return HttpHelper.conflict({
                    message: error.message,
                });
            }

            return HttpHelper.serverError(
                'Ocorreu um erro ao criar o usuário.',
            );
        }
    }
}
