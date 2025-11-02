const fs = require('fs');
const path = require('path');

const currentDir = __dirname;
const exclude = [
  'categorize.js',
  '.gitignore',
  'README.md',
  'CODE_OF_CONDUCT.md',
  'CONTRIBUTING.md',

  '.DS_Store',
  'LICENSE',
  '.vscode',
  'package.json',
  'package-lock.json',
  'node_modules',
];

fs.readdirSync(currentDir).forEach((file) => {
  const fullPath = path.join(currentDir, file);
  const isFile = fs.statSync(fullPath).isFile();

  if (isFile && !exclude.includes(file)) {
    const firstChar = file[0].toLowerCase();

    if (firstChar.match(/[a-z]/)) {
      const targetDir = path.join(currentDir, firstChar);
      const targetPath = path.join(targetDir, file);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir);
        console.log(`📁 Created folder: ${firstChar}`);
      }

      fs.renameSync(fullPath, targetPath);
      console.log(`📦 Moved: ${file} → ${firstChar}/`);
    }
  }
});
