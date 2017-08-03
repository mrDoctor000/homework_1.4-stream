const fs = require('fs');
const crypto = require('crypto');
const writeStream = fs.createWriteStream('data.txt.md5', { encoding: 'utf8' })

fs.createReadStream('data.txt')
  .pipe(crypto.createHash('md5'))
  .on('data', function(chunk) {
    const hash = chunk.toString('hex');
    console.log(hash);
    writeStream.write(hash);
    writeStream.end();
  })