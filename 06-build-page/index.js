const path = require('path');
const fs = require('fs/promises');
const fsStream = require('fs');
const readLine = require('readline');
const {EOL} = require('os');

const pathOutFile = path.join(__dirname, 'project-dist', 'style.css');
const writeFile = fsStream.createWriteStream(pathOutFile);

// 1
createDir(path.join(__dirname, 'project-dist'));

// 2
const writeIndex = fsStream.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
let rl = readLine.createInterface({
  input: fsStream.createReadStream(path.join(__dirname, 'template.html')),
  output: fsStream.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'))
});

rl.on('line', (line) => {
  const fileMatch = line.match(/{{(.+?)}}/);
  if (fileMatch) {
    const pathComponents = path.join(__dirname, 'components');
    fs.readdir(pathComponents).then((content) => {
      content.forEach(file => {
        if (file === fileMatch[1] + '.html') {
          fsStream.createReadStream(path.join(pathComponents, file)).on('data', (chunk) => {
            writeIndex.write(chunk);
            writeIndex.write(EOL);
          });
        }
      });
    });
  } else {
    writeIndex.write('g');
    writeIndex.write(EOL);
  }
});

// 3

fsStream.readdir(path.join(__dirname, 'styles'), (err, content) => {
  content.forEach((file) => {
    const currentFile = path.join(__dirname, 'styles', file);
    if (path.extname(file) === '.css') {
      fs.stat(currentFile).then((stat) => {
        if (stat.isFile()) {
          let readFile = fsStream.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');

          readFile.on('data', (chunk) => {
            writeFile.write(chunk);
          });
        }
      });
    }
  });
});

// 4
createDir(path.join(__dirname, 'project-dist', 'assets'));
copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));

function copyDir(src, dest) {
  fs.readdir(src).then((content) => {
    for (let el of content) {
      fs.stat(path.join(src, el)).then((status) => {
        if (status.isDirectory()) {
          createDir(path.join(dest, el));
          copyDir(path.join(src, el), path.join(dest, el));
        } else {
          fs.copyFile(path.join(src, el), path.join(dest, el)).then(() => {
          });
        }
      });
    }
  }).catch(() => {
  });
}


function createDir(pathDir) {
  fs.mkdir(pathDir, {recursive: true}).then(() => {
  }).catch(() => {
  });
}




