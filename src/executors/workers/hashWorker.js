import { parentPort, workerData } from 'node:worker_threads';
import crypto from 'node:crypto';
import * as fs from 'node:fs/promises';

class HashWorker {
  constructor(data) {
    this.pathToFile = data;
    this.res = this.#hashCalc();
  }

  #hashCalc() {
    const hash = crypto.createHash('sha256');

    try {
      fs.readFile(this.pathToFile, {encoding: 'utf-8'})
      .then((data) => parentPort.postMessage(hash.update(data).digest('hex')))
    } catch(e) {
      throw new Error('Calc hsh is wrong!');
    }
  }
}
const hash = new HashWorker(workerData);

