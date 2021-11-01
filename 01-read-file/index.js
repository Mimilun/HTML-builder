const path = require('path');
const fs = require('fs');
const pathFile = path.join(__dirname, 'text.txt');

let readStream = fs.createReadStream(pathFile, 'utf-8');

readStream.on('data', (chank) => {
  console.log(chank);
});

