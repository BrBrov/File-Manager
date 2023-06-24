import { Worker } from 'node:worker_threads';
import path from 'node:path';

import EndOfOperation from '../utils/end-of-operation.js';
import ShowProcessing from '../utils/show-process.js';

export default class HashExec {
  constructor(pathToFile, osInfo) {
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(osInfo);
    this.#hash(pathToFile);
  }

  #hash(pathToFile) {

    const pathPosition = this.state.getFSPosition();
    const pathToFileNormalize = path.join(pathPosition, pathToFile[1]);

    process.stdin.pause();

    const showProcess = new ShowProcessing();

    showProcess.start();

    const worker = this.#createWorker(pathToFileNormalize);

    worker
      .then((result) => {
        showProcess.stop();
        if (result === null){
          return this.endOfOperation.outputInfo(`Hash cannot be calculate! Somthing went wrong!`);
        } else {
          return this.endOfOperation.outputInfo(`Hash of file is ${result}`);
        }
      })
      .then(() => {
        this.endOfOperation.endOperation();
        process.stdin.resume();
      })
  }

  #createWorker(pathToFileNormalize) {

    return new Promise(resolve => {
      const worker = new Worker('./src/executors/workers/hashWorker.js', { workerData: pathToFileNormalize });

      worker.on('message', (data) => {
        resolve(data);
      });

      worker.on('error', () => {
        resolve(null);
      });
    });
  }
}