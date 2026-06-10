/**
 * inicializarExcel.cjs
 * Sube a S3 un Productos.xlsx limpio con las cabeceras correctas y sin filas.
 * Ejecutar UNA SOLA VEZ:  node scripts/inicializarExcel.cjs
 */

require("dotenv").config();
const AWS  = require("aws-sdk");
const XLSX = require("xlsx");

const BUCKET = process.env.BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || process.env.AWS_REGION || "us-east-2";
const KEY    = "Productos.xlsx";

const COLUMNAS = [
    "IdProducto",
    "NombreProducto",
    "Descripcion",
    "Categoria",
    "Valor",
    "ValorOriginal",
    "Stock",
    "Activo",
    "Destacado",
    "ConDescuento",
    "Orden",
    "ImageUrl",
    "VideoUrl",
];

AWS.config.update({
    region: REGION,
    accessKeyId:     process.env.MY_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

async function inicializar() {
    if (!BUCKET) {
        console.error("❌ BUCKET_NAME no definido en .env");
        process.exit(1);
    }

    // Crear hoja vacía con solo cabeceras
    const ws = XLSX.utils.json_to_sheet([], { header: COLUMNAS });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Productos");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    try {
        await s3.putObject({
            Bucket: BUCKET,
            Key: KEY,
            Body: buffer,
            ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }).promise();

        console.log(`✅ ${KEY} inicializado correctamente en s3://${BUCKET}/${KEY}`);
        console.log("   Columnas:", COLUMNAS.join(", "));
    } catch (err) {
        console.error("❌ Error al subir a S3:", err.message);
        process.exit(1);
    }
}

inicializar();
