import { UpdateUserUseCase } from '../use-cases/update-user.js';
import { EmailAlreadyExistsError } from '../errors/user.js';
import {
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    invalidEmailResponse,
    invalidIdResponse,
    invalidPasswordResponse,
    HttpHelper,
} from './helpers/index.js';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';

export class UpdateUserController {
    async execute(request) {
        try {
            // Validar o UUID do usuário
            const userId = request.params.userId;
            const uuidIsValid = checkIfIdIsValid(userId);

            if (!uuidIsValid) {
                return invalidIdResponse();
            }

            // Verificar se o usuário existe antes de tentar atualizar
            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(userId);

            if (!user) {
                return HttpHelper.notFound({
                    message: 'Usuário não encontrado.',
                });
            }

            // Validação de campos inválidos no corpo da requisição
            const reqBody = request.body;
            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            const someInvalidFields = Object.keys(reqBody).some(
                (field) => !allowedFields.includes(field),
            );

            if (someInvalidFields) {
                return HttpHelper.badRequest({
                    message: 'Alguns campos fornecidos são inválidos.',
                });
            }

            // Validar o email, se fornecido
            if (reqBody.email) {
                const emailIsValid = checkIfEmailIsValid(reqBody.email);

                if (!emailIsValid) {
                    return invalidEmailResponse();
                }
            }

            // Validar a senha, se fornecida
            if (reqBody.password) {
                const passwordIsValid = checkIfPasswordIsValid(
                    reqBody.password,
                );

                if (!passwordIsValid) {
                    return invalidPasswordResponse();
                }
            }

            // chamar o caso de uso para atualizar o usuário
            const updateUserUseCase = new UpdateUserUseCase();
            const updatedUser = await updateUserUseCase.execute(
                userId,
                reqBody,
            );

            return HttpHelper.ok({
                message: 'Usuário atualizado com sucesso!',
                data: updatedUser,
            });
        } catch (error) {
            console.error('Ocorreu um erro ao atualizar o usuário:', error);

            if (error instanceof EmailAlreadyExistsError) {
                return HttpHelper.conflict({
                    message: 'O email fornecido já está em uso.',
                });
            }

            return HttpHelper.serverError(
                'Ocorreu um erro ao atualizar o usuário.',
            );
        }
    }
}
