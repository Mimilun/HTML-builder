const fs = require('fs');
const path = require('path');

const pathOutFile = path.join(__dirname, 'project-dist', 'bundle.css');
const writeFile = fs.createWriteStream(pathOutFile);

fs.readdir(__dirname + '/styles', (err, content) => {
  content.forEach((file) => {
    if (path.extname(file) === '.css') {
      let readFile = fs.createReadStream(__dirname + '/styles/' + file, 'utf-8');

      readFile.on('data', (chunk) => {
        writeFile.write(chunk);
      });
    }
  });
});

