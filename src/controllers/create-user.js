import { CreateUserUseCase } from '../use-cases/create-user.js';

export class CreateUserController {
    async execute(request) {
        try {
            const params = request.body;

            // validar os dados de entrada/request (e.g., email, password, etc.)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim() === '') {
                    return {
                        statusCode: 400,
                        body: {
                            success: false,
                            message: `O campo ${field} é obrigatório.`,
                        },
                    };
                }
            }

            // chamar o caso de uso para criar o usuário
            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            // retornar a resposta adequada (e.g., status code, mensagem, etc.)
            return {
                statusCode: 201,
                body: {
                    success: true,
                    message: 'Usuário criado com sucesso!',
                    data: createdUser,
                },
            };
        } catch (error) {
            // lidar com erros
            console.error('Ocorreu um erro ao criar o usuário:', error);

            // retornar uma resposta de erro
            return {
                statusCode: 500,
                body: {
                    success: false,
                    message: 'Ocorreu um erro ao criar o usuário.',
                },
            };
        }
    }
}
