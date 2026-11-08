import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import { execSync } from "child_process";

const TARGET_DIRS = [
  "public/products/catalogo",
  "public/brand",
  "public/campaigns",
];

const VALID_EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

function getAllFiles(dir, fileList = []) {
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        getAllFiles(fullPath, fileList);
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase();
        if (VALID_EXTENSIONS.has(ext)) {
          fileList.push(fullPath);
        }
      }
    }
  } catch (err) {
    // skip unreadable
  }
  return fileList;
}

console.log("=== INICIANDO OPTIMIZACIÓN DE IMÁGENES BRAVÍO WESTERN ===");

let totalInitialBytes = 0;
let totalFinalBytes = 0;
let optimizedCount = 0;
let skippedCount = 0;

for (const targetDir of TARGET_DIRS) {
  const files = getAllFiles(targetDir);
  console.log(`\nDirectorio: ${targetDir} (${files.length} imágenes encontradas)`);

  for (const filePath of files) {
    try {
      const stats = statSync(filePath);
      const initialSize = stats.size;
      totalInitialBytes += initialSize;

      // Solo optimizar si pesa más de 300 KB
      if (initialSize < 300 * 1024) {
        skippedCount++;
        totalFinalBytes += initialSize;
        continue;
      }

      const ext = extname(filePath).toLowerCase();

      // Consultar dimensiones actuales
      const dimOutput = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}"`, { encoding: "utf8" });
      const widthMatch = dimOutput.match(/pixelWidth:\s*(\d+)/);
      const heightMatch = dimOutput.match(/pixelHeight:\s*(\d+)/);

      const width = widthMatch ? parseInt(widthMatch[1], 10) : 0;
      const height = heightMatch ? parseInt(heightMatch[1], 10) : 0;
      const maxDim = Math.max(width, height);

      // Si mide más de 1600px o pesa más de 500KB, redimensionar y recomprimir
      if (maxDim > 1600) {
        if (ext === ".jpg" || ext === ".jpeg") {
          execSync(`sips -Z 1600 -s formatOptions 82 "${filePath}" > /dev/null 2>&1`);
        } else if (ext === ".png") {
          execSync(`sips -Z 1600 "${filePath}" > /dev/null 2>&1`);
        }
      } else if (ext === ".jpg" || ext === ".jpeg") {
        execSync(`sips -s formatOptions 82 "${filePath}" > /dev/null 2>&1`);
      }

      const afterStats = statSync(filePath);
      const finalSize = afterStats.size;
      totalFinalBytes += finalSize;
      optimizedCount++;

      const savingsPct = Math.round((1 - finalSize / initialSize) * 100);
      const initialMb = (initialSize / 1024 / 1024).toFixed(2);
      const finalKb = (finalSize / 1024).toFixed(0);

      console.log(`  ✓ ${filePath.split("/").slice(-2).join("/")}: ${initialMb} MB → ${finalKb} KB (-${savingsPct}%)`);
    } catch (err) {
      console.error(`  ✗ Error procesando ${filePath}:`, err.message);
    }
  }
}

const savedMb = ((totalInitialBytes - totalFinalBytes) / 1024 / 1024).toFixed(1);
const initialTotalMb = (totalInitialBytes / 1024 / 1024).toFixed(1);
const finalTotalMb = (totalFinalBytes / 1024 / 1024).toFixed(1);

console.log("\n=======================================================");
console.log(`Imágenes optimizadas: ${optimizedCount}`);
console.log(`Imágenes ya optimizadas (<300KB): ${skippedCount}`);
console.log(`Peso inicial total: ${initialTotalMb} MB`);
console.log(`Peso final optimizado: ${finalTotalMb} MB`);
console.log(`Ahorro total de ancho de banda: ${savedMb} MB (-${Math.round((1 - totalFinalBytes / totalInitialBytes) * 100)}%)`);
console.log("=======================================================");
