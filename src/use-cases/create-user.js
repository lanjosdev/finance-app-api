import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        const { email: userEmail, password: userPassword } = createUserParams;

        // Verificar se o email já existe
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();
        const existingUser =
            await postgresGetUserByEmailRepository.execute(userEmail);

        if (existingUser) {
            throw new Error('Email already exists');
        }

        // gerar um ID único para o usuário
        const userId = uuidv4();

        // criptografar a senha
        const hashedPassword = await bcrypt.hash(userPassword, 10);

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
