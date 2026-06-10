const AWS = require('aws-sdk');

// ==========================
// CONFIGURACIÓN S3
// ==========================
const s3 = new AWS.S3({
    region: process.env.AWS_REGION || 'us-east-2',
    accessKeyId:
        process.env.MY_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:
        process.env.MY_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
});

// ==========================
// HEADERS CORS
// ==========================
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// ==========================
// HANDLER
// ==========================
exports.handler = async (event) => {
    // 🔹 Preflight (CORS)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers,
                body: 'Body vacío',
            };
        }

        const { fileBase64, contentType, productoId } = JSON.parse(event.body);

        // ==========================
        // VALIDACIONES
        // ==========================
        if (!fileBase64 || !contentType || !productoId) {
            return {
                statusCode: 400,
                headers,
                body: 'Datos incompletos',
            };
        }

        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/x-png',
            'image/webp',
            'image/avif',
        ];

        if (!allowedTypes.includes(contentType)) {
            return {
                statusCode: 415,
                headers,
                body: 'Tipo de imagen no permitido',
            };
        }

        const extMap = {
            'image/jpeg': 'jpg',
            'image/jpg':  'jpg',
            'image/png':  'png',
            'image/x-png':'png',
            'image/webp': 'webp',
            'image/avif': 'avif',
        };

        // ==========================
        // CONSTRUCCIÓN KEY S3
        // ==========================
        const paddedId = String(productoId).padStart(6, '0');
        const extension = extMap[contentType];
        const key = `productos/${paddedId}/main.${extension}`;

        const buffer = Buffer.from(fileBase64, 'base64');

        // ==========================
        // SUBIDA A S3
        // ==========================
        await s3
            .putObject({
                Bucket: process.env.BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: contentType,
            })
            .promise();

        // ==========================
        // RESPUESTA OK
        // ==========================
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                url: `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION || 'us-east-2'}.amazonaws.com/${key}`,
            }),
        };
    } catch (err) {
        console.error('❌ Error subir imagen:', err);

        return {
            statusCode: 500,
            headers,
            body: 'Error subiendo imagen',
        };
    }
};
