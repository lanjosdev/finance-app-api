import { PostgresCreateUserRepository } from './create-user.js';

export async function testarCriacaoDeUsuario() {
    // 1. Defina os dados do usuário que deseja inserir
    // (Certifique-se de que o ID corresponda ao tipo do seu banco, por exemplo, UUID)
    const mockUser = {
        ID: '123e4567-e89b-12d3-a456-426614174001',
        first_name: 'Lucas',
        last_name: 'Silva',
        email: 'lucas.teste@exampl.com',
        password: 'senha_criptografada_123',
    };

    try {
        // 2. Se o seu PostgresHelper precisar ser inicializado/conectado antes, chame-o aqui.
        // ex: await PostgresHelper.connect('sua_string_de_conexao');

        console.log('Iniciando inserção de usuário...');

        // 3. Instancie o repositório e execute a query
        const repository = new PostgresCreateUserRepository();
        const resultado = await repository.execute(mockUser);

        console.log('Usuário inserido com sucesso!');
        console.log('Resultado do banco:', resultado[0]);
    } catch (error) {
        console.error('Erro ao executar o repositório:', error);
    } finally {
        // 4. Feche a conexão com o banco para que o script não fique travado
        // ex: await PostgresHelper.disconnect();
    }
}
