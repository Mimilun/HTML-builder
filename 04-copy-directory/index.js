const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'), {recursive: true}, () => {
  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, () => {
    fs.readdir(path.join(__dirname, 'files'), (err, content) => {
      content.forEach((el) => {
        fs.stat(path.join(__dirname, 'files', el), (err, stats) => {
          if (stats.isDirectory()) {
            fs.mkdir(path.join(__dirname, 'files-copy', el), {recursive:true}, () => {});
          } else {
            fs.copyFile(__dirname + '/files/' + el, __dirname + '/files-copy/' + el, () => {
            });
          }
        });
      });
    });
  });
});

