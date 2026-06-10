const AWS = require("aws-sdk");
const XLSX = require("xlsx");
require("dotenv").config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const FILE_KEY = "Productos.xlsx";

AWS.config.update({
    region: REGION,
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Extrae la Key de S3 desde una URL completa
// Ej: https://bucket.s3.region.amazonaws.com/productos/000001/main.jpg → productos/000001/main.jpg
const urlToKey = (url) => {
    if (!url) return null;
    try {
        const parsed = new URL(url);
        // pathname empieza con "/", lo quitamos
        return parsed.pathname.replace(/^\//, "").split("?")[0];
    } catch {
        return null;
    }
};

// Elimina un objeto de S3 sin lanzar error si no existe
const eliminarArchivoS3 = async (key) => {
    if (!key) return;
    try {
        await s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
        console.log("🗑️ Archivo eliminado de S3:", key);
    } catch (err) {
        console.warn("⚠️ No se pudo eliminar archivo S3:", key, err.message);
    }
};

exports.handler = async (event) => {
    console.log("📥 eliminarProducto.cjs");

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "OK" };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: "Método no permitido" }),
        };
    }

    let idEliminar;

    try {
        const body = JSON.parse(event.body || "{}");
        idEliminar = Number(body.IdProducto);

        if (!Number.isFinite(idEliminar) || idEliminar <= 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ message: "IdProducto inválido", recibido: body.IdProducto }),
            };
        }

        // 1. Leer Excel desde S3
        const file = await s3.getObject({ Bucket: BUCKET_NAME, Key: FILE_KEY }).promise();
        const workbook = XLSX.read(file.Body, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // 2. Buscar el producto para obtener sus URLs antes de borrar
        const productoAEliminar = data.find(row => Number(row.IdProducto) === idEliminar);

        if (!productoAEliminar) {
            console.warn("⚠️ IdProducto no encontrado:", idEliminar);
        }

        // 3. Eliminar imagen y video de S3
        const imageKey = urlToKey(productoAEliminar?.ImageUrl);
        const videoKey = urlToKey(productoAEliminar?.VideoUrl);

        await Promise.all([
            eliminarArchivoS3(imageKey),
            eliminarArchivoS3(videoKey),
        ]);

        // 4. Eliminar fila del Excel y guardarlo
        const actualizados = data.filter(row => Number(row.IdProducto) !== idEliminar);

        const COLUMNAS = [
            "IdProducto", "NombreProducto", "Descripcion", "Categoria",
            "Valor", "ValorOriginal", "Stock", "Activo", "Destacado",
            "ConDescuento", "Orden", "ImageUrl", "VideoUrl"
        ];

        const newSheet = XLSX.utils.json_to_sheet(actualizados, { header: COLUMNAS });
        workbook.Sheets[sheetName] = newSheet;

        const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
            Body: buffer,
            ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }).promise();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                message: "Producto eliminado correctamente",
                IdProducto: idEliminar,
                imageKey,
                videoKey,
            }),
        };

    } catch (error) {
        console.error("❌ Error eliminarProducto:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Error interno al eliminar producto", error: error.message }),
        };
    }
};
