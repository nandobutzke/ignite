import { Readable, Transform, Writable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 0

  _read() {
    let i = this.index++;

    if (i > 100) {
      this.push(null)
    } else {
      setTimeout(() => {
        this.push(Buffer.from(String(i)))
      }, 500)
    }
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformedValue = Number(chunk.toString()) * -1

    callback(null, Buffer.from(transformedValue.toString()))
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())