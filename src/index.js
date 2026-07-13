import 'dotenv/config';
import express from 'express';
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
} from './controllers/index.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Rota para criar um usuário
app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController();
    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

// Rota para buscar um usuário por ID
app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = new GetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(req);

    res.status(statusCode).send(body);
});

// Rota para atualizar um usuário por ID
app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = new UpdateUserController();
    const { statusCode, body } = await updateUserController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
