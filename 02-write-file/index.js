const readLine = require('readline');
const fs = require('fs');
const path = require('path');
const os = require('os');

let writeableStream = fs.createWriteStream(path.join(__dirname, 'test.txt'));

let rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Enter text:');
rl.on('line', (line) => {
  if (line === 'exit'.trim()) {
    writeableStream.end();
    rl.close();
  } else {
    writeableStream.write(line + os.EOL);
  }
});

rl.on('close', () => {
  console.log('Good byu');
});