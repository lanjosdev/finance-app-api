export class HttpHelper {
    // 400
    static badRequest(body) {
        // Se passar apenas a mensagem como string (ex: badRequest('Erro!'))
        if (typeof body === 'string') {
            return {
                statusCode: 400,
                body: {
                    success: false,
                    message: body,
                },
            };
        }

        // Se passar um objeto, fazemos o merge com os valores default
        return {
            statusCode: 400,
            body: {
                success: false, // valor default
                ...body, // sobrescreve 'success' se existir em bodyData, e adiciona o resto
            },
        };
    }

    static notFound(body) {
        return {
            statusCode: 404,
            body: {
                success: false, // valor default
                ...body, // sobrescreve os defaults se vier no parâmetro
            },
        };
    }

    static conflict(body) {
        return {
            statusCode: 409,
            body: {
                success: false, // valor default
                ...body, // sobrescreve 'success' se existir em bodyData, e adiciona o resto
            },
        };
    }

    // 200
    static ok(body) {
        return {
            statusCode: 200,
            body: {
                success: true, // valor default
                ...body, // sobrescreve os defaults se vier no parâmetro
            },
        };
    }

    static created(body) {
        return {
            statusCode: 201,
            body: {
                success: true, // valor default
                message: 'Criado com sucesso!', // valor default
                ...body, // sobrescreve os defaults se vier no parâmetro
            },
        };
    }

    // 500
    static serverError(message = 'Ocorreu um erro no servidor.') {
        return {
            statusCode: 500,
            body: {
                success: false,
                message: message,
            },
        };
    }
}
