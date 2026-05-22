import { PostgresHelper } from '../../db/postgres/helper.js';

export class PostgresCreateUserRepository {
    async execute(createUserData) {
        // Por padrao do comando INSERT não retorna o usuário criado, por isso usamos o RETURNING *
        const results = await PostgresHelper.query(
            `INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [
                createUserData.id,
                createUserData.first_name,
                createUserData.last_name,
                createUserData.email,
                createUserData.password,
            ],
        );
        const createdUser = results[0];

        return createdUser;
    }
}
