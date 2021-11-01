const path = require('path');
const fs = require('fs');
const currentFile = path.join(__dirname, 'text.txt');

let readStream = fs.createReadStream(currentFile, 'utf-8');

readStream.on('data', (chank) => {
  console.log(chank);
});

