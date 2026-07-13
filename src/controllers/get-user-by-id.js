import { GetUserByIdUseCase } from '../use-cases/index.js';
import {
    checkIfIdIsValid,
    invalidIdResponse,
    HttpHelper,
} from './helpers/index.js';

export class GetUserByIdController {
    async execute(request) {
        try {
            const userId = request.params.userId;
            const uuidIsValid = checkIfIdIsValid(userId);

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
