const AWS = require('aws-sdk');
require('dotenv').config();

const BUCKET_NAME = process.env.MY_BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || 'us-east-2';

AWS.config.update({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    region: REGION,
});

const s3 = new AWS.S3();

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const extMap = {
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/quicktime': 'mov',
};

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ message: 'Método no permitido' }) };
    }

    try {
        const { productoId, contentType } = JSON.parse(event.body || '{}');

        if (!productoId || !contentType) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ message: 'Faltan productoId o contentType' }) };
        }

        const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
        if (!allowedTypes.includes(contentType)) {
            return { statusCode: 415, headers: corsHeaders, body: JSON.stringify({ message: 'Tipo de video no permitido' }) };
        }

        const extension = extMap[contentType];
        const paddedId = String(productoId).padStart(6, '0');
        const key = `productos/${paddedId}/video.${extension}`;

        // URL firmada válida por 5 minutos para subir directo desde el browser
        const signedUrl = s3.getSignedUrl('putObject', {
            Bucket: BUCKET_NAME,
            Key: key,
            ContentType: contentType,
            Expires: 300,
        });

        const publicUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${key}`;

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ signedUrl, url: publicUrl }),
        };
    } catch (err) {
        console.error('❌ Error generando URL firmada:', err);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ message: 'Error al generar URL de subida' }),
        };
    }
};
