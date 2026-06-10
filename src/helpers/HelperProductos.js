import * as XLSX from "xlsx";

// Función para transformar cada fila en un producto válido
function transformarProductos(data) {
  return data.map((row) => ({
    IdProducto:     Number(row["IdProducto"]),
    NombreProducto: row["NombreProducto"] || "",
    Descripcion:    row["Descripcion"]    || "",
    Categoria:      row["Categoria"]      || "",
    Valor:          Number(row["Valor"])  || 0,
    ValorOriginal:  Number(row["ValorOriginal"]) || 0,
    Stock:          Number(row["Stock"])  || 0,
    Activo:         String(row["Activo"]).toLowerCase() !== "false",
    Destacado:      String(row["Destacado"]).toLowerCase() === "true",
    ConDescuento:   String(row["ConDescuento"]).toLowerCase() === "true",
    Orden:          Number(row["Orden"])  || 9999,
    ImageUrl:       row["ImageUrl"]       || "",
    VideoUrl:       row["VideoUrl"]       || "",
  }));
}

// URL base de las funciones Netlify
const functionsBase =
  window.location.hostname === "localhost"
    ? "http://localhost:8888"
    : "";

// Función principal exportada — siempre va a través de la función Netlify (sin CORS)
export const cargarProductos = async () => {
  try {
    const response = await fetch(
      `${functionsBase}/.netlify/functions/obtenerProductos`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("No se pudo obtener el archivo Excel");
    }

    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });

    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(hoja);

    return transformarProductos(jsonData);
  } catch (error) {
    console.error("❌ Error al cargar productos:", error);
    return [];
  }
};
