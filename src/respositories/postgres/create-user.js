import { PostgresHelper } from '../../db/postgres/helper.js';

export class PostgresCreateUserRepository {
    async execute(createUserData) {
        const results = await PostgresHelper.query(
            `INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)`,
            [
                createUserData.ID,
                createUserData.first_name,
                createUserData.last_name,
                createUserData.email,
                createUserData.password,
            ],
        );

        return results[0];
    }
}
