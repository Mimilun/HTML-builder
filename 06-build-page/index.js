const path = require('path');
const fs = require('fs/promises');
const fsStream = require('fs');
const pathDir = path.join(__dirname, 'project-dist');

// 1
buildHtml();

async function buildHtml() {
  await fs.rm(pathDir, {recursive: true, force: true});
  await fs.mkdir(pathDir, {recursive: true});
  task2();
  task3();
  task4();
}


// 2
async function task2() {
  fsStream.readFile(path.join(__dirname, 'template.html'), 'utf-8', (err, data) => {
    let html = data.toString();
    fs.readdir(path.join(__dirname, 'components')).then((files) =>
      files.forEach((file) => {
        let fileName = path.parse(file).name;
        fs.readFile(path.join(__dirname, 'components', file), 'utf-8').then((data) => {
          html = html.replace(`{{${fileName}}}`, data);
          fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), html);
        });
      })
    );
  });
}


// 3
async function task3() {
  const styleFile = path.join(__dirname, 'project-dist', 'style.css');
  const writeFile = fsStream.createWriteStream(styleFile);

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
}

// 4
async function task4() {
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets')).then(() => {
    copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
  });
}

async function copyDir(src, dest) {
  fs.readdir(src)
    .then((content) => {
      for (let el of content) {
        fs.stat(path.join(src, el))
          .then((status) => {
            if (status.isDirectory()) {
              fs.mkdir(path.join(dest, el), {recursive: true})
                .then(() => {
                  copyDir(path.join(src, el), path.join(dest, el));
                });
            } else {
              fs.copyFile(path.join(src, el), path.join(dest, el))
                .then(() => {
                });
            }
          });
      }
    });
}








