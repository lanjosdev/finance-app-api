export class EmailAlreadyExistsError extends Error {
    constructor(email) {
        super(`O email ${email} já está em uso.`);
        this.name = 'EmailAlreadyExistsError';
    }
}
