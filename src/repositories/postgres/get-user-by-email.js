import { PostgresHelper } from '../../db/postgres/helper.js';

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        const results = await PostgresHelper.query(
            'SELECT * FROM users WHERE email = $1',
            [email],
        );
        const user = results[0];

        return user;
    }
}
