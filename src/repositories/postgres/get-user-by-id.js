import { PostgresHelper } from '../../db/postgres/helper.js';

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        const result = await PostgresHelper.query(
            'SELECT id, first_name, last_name, email FROM users WHERE id = $1',
            [userId],
        );
        const user = result[0];

        return user;
    }
}
