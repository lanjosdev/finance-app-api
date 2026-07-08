import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { invalidIdResponse } from './helpers/user.js';
import { HttpHelper } from './helpers/http.js';
import validator from 'validator';

export class GetUserByIdController {
    async execute(request) {
        try {
            const userId = request.params.userId;
            const uuidIsValid = validator.isUUID(userId);

            if (!uuidIsValid) {
                return invalidIdResponse();
            }

            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(userId);

            if (!user) {
                return HttpHelper.notFound({
                    message: 'Usuário não encontrado.',
                });
            }

            return HttpHelper.ok({
                message: 'Usuário encontrado com sucesso!',
                data: user,
            });
        } catch (error) {
            console.error('Ocorreu um erro ao buscar o usuário:', error);

            return HttpHelper.serverError(
                'Ocorreu um erro ao buscar o usuário.',
            );
        }
    }
}
