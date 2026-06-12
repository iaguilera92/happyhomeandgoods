const AWS = require('aws-sdk');
const XLSX = require('xlsx');

const BUCKET_NAME = process.env.MY_BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || 'us-east-2';
const FILE_KEY = 'Productos.xlsx';

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

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: corsHeaders, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ message: 'Método no permitido' }) };
    }

    try {
        const { productoId, videoUrl } = JSON.parse(event.body || '{}');

        if (!productoId) {
            return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ message: 'Falta productoId' }) };
        }

        // Eliminar objeto S3 si tenemos la URL
        if (videoUrl && videoUrl.trim()) {
            try {
                // Extraer key desde URL: https://bucket.s3.region.amazonaws.com/KEY
                const urlObj = new URL(videoUrl);
                const key = urlObj.pathname.replace(/^\//, '');
                await s3.deleteObject({ Bucket: BUCKET_NAME, Key: key }).promise();
                console.log('🗑️ Video S3 eliminado:', key);
            } catch (s3Err) {
                console.warn('⚠️ No se pudo eliminar el video de S3:', s3Err.message);
                // Continuar de todas formas para limpiar el Excel
            }
        }

        // Leer Excel desde S3
        const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: FILE_KEY }).promise();
        const workbook = XLSX.read(s3Data.Body, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const hoja = workbook.Sheets[sheetName];
        let datos = XLSX.utils.sheet_to_json(hoja);

        // Limpiar VideoUrl del producto
        const idNum = Number(productoId);
        let encontrado = false;
        datos = datos.map((row) => {
            if (Number(row.IdProducto) === idNum) {
                encontrado = true;
                return { ...row, VideoUrl: '' };
            }
            return row;
        });

        if (!encontrado) {
            return { statusCode: 404, headers: corsHeaders, body: JSON.stringify({ message: 'Producto no encontrado' }) };
        }

        // Guardar Excel actualizado
        const COLUMNAS = [
            'IdProducto', 'NombreProducto', 'Descripcion', 'Categoria',
            'Valor', 'ValorOriginal', 'Stock', 'Activo', 'Destacado',
            'ConDescuento', 'Orden', 'ImageUrl', 'VideoUrl',
            'ImagenPosicion', 'ImagenZoom', 'Pack',
        ];

        const nuevaHoja = XLSX.utils.json_to_sheet(datos, { header: COLUMNAS });
        workbook.Sheets[sheetName] = nuevaHoja;

        const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
            Body: buffer,
            ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }).promise();

        console.log('✅ VideoUrl limpiado para producto:', idNum);

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ message: 'Video eliminado correctamente' }),
        };
    } catch (err) {
        console.error('❌ Error en eliminarVideoProducto.cjs:', err);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ message: 'Error al eliminar el video' }),
        };
    }
};
