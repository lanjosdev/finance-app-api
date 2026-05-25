import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        // TODO: verificar se o email já existe

        // gerar um ID único para o usuário
        const userId = uuidv4();

        // criptografar a senha
        const hashedPassword = await bcrypt.hash(createUserParams.password, 10);

        // criar o objeto do usuário
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        };

        // criar o usuário no banco de dados
        const postgresCreateUserRepository = new PostgresCreateUserRepository();
        const createdUser = await postgresCreateUserRepository.execute(user);

        return createdUser;
    }
}
