import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Worker } from 'node:worker_threads';

import DeepParse from '../utils/deep-parse.js';
import EndOfOperation from '../utils/end-of-operation.js';
import ShowProcessing from '../utils/show-process.js';
import RmExec from './rm.js';

export default class MvExec extends DeepParse {
  constructor(commandLine, osInfo) {
    super();
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.#mv(commandLine);
  }

  #mv(commandLine) {

    const separator = this.getSeparator(commandLine);

    const ways = this.parse(commandLine, separator);

    if (!ways) {
      return this.#showError('Operation failed!\nCheck the spelling of the file paths\nExample: mv /folder/old_name.ext /folder/destination_folder');
    }

    let from;
    if (ways[0].startsWith(separator)) {
      from = path.join(this.state.getFSPosition(), '/', ways[0]);
    } else {
      from = path.join(ways[0]);
    }

    let to;
    if (ways[1].startsWith(separator)) {
      to = path.join(this.state.getFSPosition(), ways[1], '/', path.basename(from));
    } else {
      to = path.normalize(ways[1]);
    }

    process.stdin.pause();

    const showProcess = new ShowProcessing();
    showProcess.start();

    const worker = this.#createWorker(from, to);

    worker
      .then((data) => {
        fs.rm(from)
        .then(() => {
          showProcess.stop();
          this.endOfOperation.outputInfo('Move was done!');
          this.endOfOperation.endOperation();
          process.stdin.resume();
        })
        .catch(() => {
          showProcess.stop();
          this.#showError(`Operation faled!\nCan\'t delete file!`);
          process.stdin.resume();
        });
      })
      .catch(() => {
        showProcess.stop();
        this.endOfOperation.outputInfo('Operation failed.');
        this.endOfOperation.endOperation();
        process.stdin.resume();
      })
  }

  #createWorker(from, to) {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./src/executors/workers/copyWorker.js', { workerData: [from, to] });

      worker.on('message', (data) => {
        resolve(data);
      });

      worker.on('error', (e) => {
        reject('err');
      });
    })
  }

  #showError(string) {
    this.endOfOperation.outputInfo(string);
    this.endOfOperation.endOperation();
  }
}