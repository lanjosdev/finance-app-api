import 'dotenv/config';
import express from 'express';
import { CreateUserController } from './controllers/create-user.js';

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Rota para criar um usuário
app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController();
    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
