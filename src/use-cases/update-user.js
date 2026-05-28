import { EmailAlreadyExistsError } from '../errors/user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';
import bcrypt from 'bcrypt';
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js';

export class UpdateUserUseCase {
    async execute(userId, updateUserData) {
        const userData = { ...updateUserData };

        // se o email for atualizado, verificar se o novo email já existe
        if (userData.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository();
            const existingUser = await postgresGetUserByEmailRepository.execute(
                userData.email,
            );

            if (existingUser) {
                throw new EmailAlreadyExistsError(userData.email);
            }
        }

        // se a senha for atualizada, criptografar a nova senha
        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
        }

        // chamar o repository para atualizar o usuário no banco de dados
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
        const updatedUser = await postgresUpdateUserRepository.execute(
            userId,
            userData,
        );

        return updatedUser;
    }
}
