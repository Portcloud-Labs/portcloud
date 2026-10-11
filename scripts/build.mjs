import { copyFile, mkdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const files = ['index.html', 'assets/logo.svg', 'assets/logo-mark.svg', 'assets/language.js'];
await mkdir(new URL('dist/assets/', root), { recursive: true });
for (const file of files) {
  await copyFile(new URL(file, root), new URL(`dist/${file}`, root));
}
console.log(`Static site packaged: ${files.join(', ')}`);
