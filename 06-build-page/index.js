const path = require('path');
const fs = require('fs/promises');
const fsStream = require('fs');

const pathOutFile = path.join(__dirname, 'project-dist', 'style.css');
const writeFile = fsStream.createWriteStream(pathOutFile);

// 1
createDir(path.join(__dirname, 'project-dist'));

// 2

fsStream.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
  let html = data.toString();
  fs.readdir(path.join(__dirname, 'components')).then((files) =>
    files.forEach(async (file) => {
      let fileName = path.parse(file).name;
      fs.readFile(path.join(__dirname, 'components', file), 'utf-8').then((data) => {
        html = html.replace(`{{${fileName}}}`, data);
        fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), html);
      });
    })
  );

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




