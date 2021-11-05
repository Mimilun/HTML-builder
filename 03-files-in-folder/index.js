const fs = require('fs/promises');
const path = require('path');

fs.readdir(__dirname + '/secret-folder', 'utf-8').then((content) => {
  content.forEach((el) => {
    fs.stat(__dirname + '/secret-folder/' + el).then((stat) => {
      if (stat.isFile()) {
        console.log(`${path.basename(el, path.extname(el))} - ${path.extname(el).slice(1)} - ${stat.size / 1024}kb`);
      }
    });
  });
});

