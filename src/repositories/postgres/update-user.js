import { PostgresHelper } from '../../db/postgres/helper.js';

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserData) {
        // Manipula os campos a serem atualizados dinamicamente
        const setFields = [];
        const values = [];

        Object.keys(updateUserData).forEach((key, index) => {
            setFields.push(`${key} = $${index + 1}`);
            values.push(updateUserData[key]);
        });

        values.push(userId); // Adiciona o userId como último valor para o WHERE

        // Query para atualizar o usuário, usando os campos dinâmicos e retornando o usuário atualizado
        const query = `
            UPDATE users 
            SET ${setFields.join(', ')} 
            WHERE id = $${values.length} 
            RETURNING id, first_name, last_name, email
        `;

        const resultsQuery = await PostgresHelper.query(query, values);
        const updatedUser = resultsQuery[0];

        return updatedUser;
    }
}
