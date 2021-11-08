const path = require('path');
const fs = require('fs/promises');
const fsStream = require('fs');
const readLine = require('readline');
const {log} = require('util');

const pathOutFile = path.join(__dirname, 'project-dist', 'style.css');
const writeFile = fsStream.createWriteStream(pathOutFile);

// 1
createDir(path.join(__dirname, 'project-dist'));

// 2

let rl = readLine.createInterface({
  input: fsStream.createReadStream(path.join(__dirname, 'template.html')),
  // output: process.stdout
});
rl.on('line', (line) => {
  let file = line.match(/{{(.+?)}}/);
  if (file) {
    console.log(file[1]);
    console.log(getContentOfComponents(file[1]).then());
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

// functions

async function getContentOfComponents(fileName) {
  const pathComponents = path.join(__dirname, 'components');
  let res = '';
  fs.readdir(pathComponents).then((content) => {
    content.forEach(file => {
      if (file === fileName + '.html') {
        fsStream.createReadStream(path.join(pathComponents, file)).on('data', chunk => {
          res += chunk;
        });
      }
    });
  });
  return res;
}

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




