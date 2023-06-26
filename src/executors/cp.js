import * as fs from 'node:fs/promises';
import path from 'node:path';
import { Worker } from 'node:worker_threads';

import EndOfOperation from '../utils/end-of-operation.js';
import ShowProcessing from '../utils/show-process.js';

export default class CpExec {
  constructor(commandLine, osInfo) {
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.#cp(commandLine);
  }

  #cp(commandLine) {
    const separator = this.#getSeparator(commandLine)
    const waysObject = this.#parse(commandLine, separator);

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

  #parse(commandLine, separator) {
    const pathArr = commandLine.slice(1).join(' ');

    let from, to;
    const pathRef = pathArr.split(` ${separator}`);

    [from, to] = pathRef;

    if (pathRef.length !== 2) {
      if (/\s\w:(\/|\\)/.test(pathArr)) {
        const index = pathArr.search(/\s\w:(\/|\\)/);
        from = pathArr.slice(0, index);
        to = pathArr.slice(index + 1);
      } else {
        return null;
      }
    }
    
    if(from.slice(0,1) !== separator) {
      from = separator + from;
    }

    to = separator.concat(to);
    return [from, to];
  }

  #getSeparator(commandLine) {
    const pathArr = commandLine.slice(1).join(' ');

    let separator = null;

    if (pathArr.includes('/')) {
      return '/';
    }

    if (pathArr.includes('\\')) {
      return '\\';
    }

    if (!separator) {
      return null;
    }
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