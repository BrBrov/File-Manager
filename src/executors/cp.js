import path from 'node:path';
import { Worker } from 'node:worker_threads';

import DeepParse from '../utils/deep-parse.js';
import EndOfOperation from '../utils/end-of-operation.js';
import ShowProcessing from '../utils/show-process.js';

export default class CpExec extends DeepParse {
  constructor(commandLine, osInfo) {
    super();
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.#cp(commandLine);
  }

  #cp(commandLine) {
    const separator = this.getSeparator(commandLine)
    const waysObject = this.parse(commandLine, separator);

    if (!waysObject) {
      return this.#showError('Operation failed!\nCheck the spelling of the file paths\nExample: cp /folder/old_name.ext /folder/destination_folder');
    }

    let from;
    if (waysObject[0].startsWith(separator)) {
      from = path.join(this.state.getFSPosition(), '/', waysObject[0]);
    } else {
      from = path.join(waysObject[0]);
    }

    let to;
    if (waysObject[1].startsWith(separator)) {
      to = path.join(this.state.getFSPosition(), waysObject[1], '/', path.basename(from));
    } else {
      to = path.normalize(waysObject[1]);
    }

    process.stdin.pause();
    const showProcess = new ShowProcessing();
    showProcess.start();

    const work = this.#createWorker(from, to);

    work
      .then((data) => {
        this.endOfOperation.outputInfo('Copy was done!');
      })
      .catch(() => {
        this.endOfOperation.outputInfo('Operation failed.');
      })
      .finally(() => {
        showProcess.stop();
        this.endOfOperation.endOperation();
        process.stdin.resume();
      })
  }

  #showError(string) {
    this.endOfOperation.outputInfo(string);
    this.endOfOperation.endOperation();
  }

  #createWorker(from, to) {
    return new Promise((resolve, reject) => {
      const worker = new Worker('./src/executors/workers/copyWorker.js', { workerData: [from, to ] });

      worker.on('message', (data) => {
        resolve(data);});

      worker.on('error', (e) => {
        reject('err');});
    })
  }
}