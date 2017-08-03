const fs = require('fs');
//const request = require('request');
const crypto = require('crypto');

const Transform = require('stream').Transform;

class MyTransform extends Transform {
  constructor(options) {
    super(options)
  }

  _transform(chunk,  encoding,  callback) {
    chunk
      .pipe(crypto.createHash('md5'))
      .pipe(fs.createWriteStream('data2.txt'));


    callback(null, chunk);
  }
}

const tr = new MyTransform();

tr
  .on('data', chunk => console.log(chunk.toString()))


/*
request
  .get('./data.txt')
  .pipe(crypto.createHash('md5'))
  .pipe(fs.createWriteStream('data2.txt'))

.on('error', () => {})

.on('finish', () => {
  console.log(`Файл записан: ${fs.createReadStream('data2.txt')}`);
})
*/