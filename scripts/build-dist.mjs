import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const allowedExtensions = new Set(['.html', '.css', '.js', '.json', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico']);
const ignoredNames = new Set(['dist', '.git', 'node_modules', 'scripts']);

async function buildDist() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  const entries = await readdir(rootDir, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoredNames.has(entry.name)) {
      continue;
    }

    const sourcePath = path.join(rootDir, entry.name);
    const targetPath = path.join(distDir, entry.name);

    if (entry.isDirectory()) {
      await cp(sourcePath, targetPath, {
        recursive: true,
        filter: (src) => {
          const baseName = path.basename(src);
          if (ignoredNames.has(baseName)) {
            return false;
          }

          const extension = path.extname(src);
          return extension === '' || allowedExtensions.has(extension);
        },
      });
      continue;
    }

    if (allowedExtensions.has(path.extname(entry.name))) {
      await cp(sourcePath, targetPath);
    }
  }


  const previewPath = path.join(distDir, 'curioni-preview.html');
  const indexPath = path.join(distDir, 'index.html');

  try {
    await cp(previewPath, indexPath);
  } catch (error) {
    console.warn('Aviso: curioni-preview.html não encontrado para gerar index.html');
  }

  console.log('✅ Dist gerado em', distDir);
}

buildDist().catch((error) => {
  console.error('Erro ao gerar dist:', error);
  process.exitCode = 1;
});
