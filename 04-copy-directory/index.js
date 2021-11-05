const fs = require('fs');

fs.mkdir(__dirname + '/files-copy', {recursive: true}, () => {});

fs.readdir(__dirname + '/files',(err, content) => {
  content.forEach((el) => {
    fs.copyFile(__dirname + '/files/' + el, __dirname + '/files-copy/' + el,() => {});
  });
});
