const fs = require('fs');
const crypto = require('crypto');

const Transform = require('stream').Transform;

class MyTransform extends Transform {
  constructor(options) {
    super(options)
  }

  _transform(chunk,  encoding,  callback) {
    const hash = chunk.toString('hex');
    callback(null, hash);
  }
}

const tr = new MyTransform();

fs.createReadStream('data.txt')
  .pipe(crypto.createHash('md5'))
  .pipe(tr)
  .on('data', function(chunk) {
    console.log(chunk.toString());
  })
  .pipe(fs.createWriteStream('data.txt.md5', { encoding: 'utf8' }))