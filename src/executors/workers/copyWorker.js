import * as fs from 'node:fs';
import { workerData, parentPort } from 'node:worker_threads';

//cd Downloads
//cp /file.txt /Telegram Desktop
class CopyWorker {
  constructor(from, to) {
    this.#copy(from, to);
  }

  async #copy(from, to) {
    fs.open(to, (err, fd) => {
      if (err) {
        const rStream = fs.createReadStream(from);
        const wSttream = fs.createWriteStream(to);

        rStream.pipe(wSttream);

        wSttream.on('finish', () => parentPort.postMessage('ok'));
      } else {
        throw new Error('Copy is wrong');
      }
    })
  }
}

const [from, to] = [...workerData];

const copy = new CopyWorker(from, to);