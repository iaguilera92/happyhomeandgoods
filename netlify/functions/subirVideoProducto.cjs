const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    region: process.env.MY_AWS_REGION || 'us-east-2',
    accessKeyId:
        process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey:
        process.env.MY_AWS_SECRET_ACCESS_KEY,
});

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        if (!event.body) {
            return { statusCode: 400, headers, body: 'Body vacío' };
        }

        const { fileBase64, contentType, productoId } = JSON.parse(event.body);

        if (!fileBase64 || !contentType || !productoId) {
            return { statusCode: 400, headers, body: 'Datos incompletos' };
        }

        const allowedTypes = [
            'video/mp4',
            'video/webm',
            'video/quicktime', // .mov
        ];

        if (!allowedTypes.includes(contentType)) {
            return { statusCode: 415, headers, body: 'Tipo de video no permitido' };
        }

        const extMap = {
            'video/mp4':       'mp4',
            'video/webm':      'webm',
            'video/quicktime': 'mov',
        };

        const paddedId = String(productoId).padStart(6, '0');
        const extension = extMap[contentType];
        const key = `productos/${paddedId}/video.${extension}`;

        const buffer = Buffer.from(fileBase64, 'base64');

        await s3
            .putObject({
                Bucket: process.env.MY_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: contentType,
            })
            .promise();

        const url = `https://${process.env.MY_BUCKET_NAME}.s3.${process.env.MY_AWS_REGION || 'us-east-2'}.amazonaws.com/${key}`;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ url }),
        };
    } catch (err) {
        console.error('Error subir video:', err);
        return { statusCode: 500, headers, body: 'Error subiendo video' };
    }
};
