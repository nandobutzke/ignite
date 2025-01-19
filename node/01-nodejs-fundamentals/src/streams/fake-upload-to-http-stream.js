import { Readable } from 'node:stream'

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

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
})