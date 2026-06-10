require("dotenv").config(); // 👈 Importante para leer .env

const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || process.env.AWS_REGION || "us-east-1";
const FILE_KEY = "Productos.xlsx";
const LOCAL_PATH = path.resolve(__dirname, "Productos.xlsx");

// 👉 Solo usar accessKey y secretKey si están disponibles (por seguridad)
if (process.env.MY_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID && process.env.MY_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY) {
    AWS.config.update({
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
        region: REGION,
    });
} else {
    AWS.config.update({ region: REGION });
}

const s3 = new AWS.S3();

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

exports.handler = async function (event) {
    console.log("📥 Petición recibida en restaurarProductos.cjs");

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers,
            body: "OK",
        };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: "Método no permitido. Usa POST." }),
        };
    }

    try {
        if (!fs.existsSync(LOCAL_PATH)) {
            console.error("❌ Archivo local no encontrado en:", LOCAL_PATH);
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ message: "Archivo local Productos.xlsx no encontrado" }),
            };
        }

        const buffer = fs.readFileSync(LOCAL_PATH);

        await s3
            .putObject({
                Bucket: BUCKET_NAME,
                Key: FILE_KEY,
                Body: buffer,
                ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            })
            .promise();

        console.log("✅ Excel Productos.xlsx restaurado exitosamente desde local a S3");

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "Se ha restaurado el catálogo de productos correctamente!" }),
        };
    } catch (error) {
        console.error("❌ Error al restaurar Productos.xlsx:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Error interno del servidor" }),
        };
    }
};
