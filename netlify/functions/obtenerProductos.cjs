const AWS = require("aws-sdk");
require("dotenv").config();

const BUCKET_NAME = process.env.MY_BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || "us-east-2";
const FILE_KEY = "Productos.xlsx";

const s3 = new AWS.S3({
    region: REGION,
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
});

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
};

exports.handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "OK" };
    }

    try {
        const s3Data = await s3
            .getObject({ Bucket: BUCKET_NAME, Key: FILE_KEY })
            .promise();

        return {
            statusCode: 200,
            headers: {
                ...headers,
                "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "Cache-Control": "no-store",
            },
            body: s3Data.Body.toString("base64"),
            isBase64Encoded: true,
        };
    } catch (error) {
        console.error("Error al obtener Productos.xlsx:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Error al obtener productos" }),
        };
    }
};
