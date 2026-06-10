// archivo: eliminarTrabajo.cjs
const AWS = require("aws-sdk");
const XLSX = require("xlsx");
require("dotenv").config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || process.env.AWS_REGION || "us-east-1";
const FILE_KEY = "Trabajos.xlsx";

AWS.config.update({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
    region: REGION,
});

const s3 = new AWS.S3();

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: corsHeaders, body: "OK" };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Método no permitido" }),
        };
    }

    try {
        console.log("📦 event.body recibido:", event.body);
        const body = JSON.parse(event.body || "{}");
        const { Trabajo } = body;

        if (!Trabajo) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ message: "Falta el campo Trabajo" }),
            };
        }

        // 📥 Leer Excel desde S3
        const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: FILE_KEY }).promise();
        const workbook = XLSX.read(s3Data.Body, { type: "buffer" });
        const hoja = workbook.Sheets[workbook.SheetNames[0]];
        const datos = XLSX.utils.sheet_to_json(hoja, { defval: "" });

        // ❌ Filtrar quitando el trabajo a eliminar
        const datosFiltrados = datos.filter(
            (row) => String(row.Trabajo).trim().toLowerCase() !== String(Trabajo).trim().toLowerCase()
        );

        if (datosFiltrados.length === datos.length) {
            console.warn("⚠️ No se encontró el trabajo:", Trabajo);
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({ message: "Trabajo no encontrado" }),
            };
        }

        console.log("🗑️ Trabajo eliminado:", Trabajo);

        // 📤 Subir Excel actualizado
        const nuevaHoja = XLSX.utils.json_to_sheet(datosFiltrados);
        workbook.Sheets[workbook.SheetNames[0]] = nuevaHoja;
        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        console.log("⏫ Subiendo archivo a S3...");
        await s3
            .putObject({
                Bucket: BUCKET_NAME,
                Key: FILE_KEY,
                Body: buffer,
                ContentType:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            })
            .promise();
        console.log("✅ Subida completada");

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                message: "Trabajo eliminado correctamente",
                eliminado: Trabajo,
            }),
        };
    } catch (error) {
        console.error("❌ Error al eliminar trabajo:", error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Error interno del servidor", error: error.message }),
        };
    }
};
