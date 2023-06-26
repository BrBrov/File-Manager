import path from 'node:path';
import * as fs from 'node:fs/promises';

import EndOfOperation from '../utils/end-of-operation.js';

export default class CatExec {
  constructor(osInfo, commandLine) {
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.#cat(commandLine);
  }

  #cat(commandLine) {
    const currentPosition = this.state.getFSPosition();

    const pathFile = commandLine.slice(1).join(' ');

    const pathToFile = path.resolve(currentPosition, pathFile);
    process.stdin.pause();

    fs.readFile(pathToFile, { encoding: 'utf-8' })
      .then((data) => {
        this.endOfOperation.outputInfo(data);
        this.endOfOperation.endOperation();
        process.stdin.resume();
      })
      .catch(() => {
        this.endOfOperation.outputInfo('Operation failed');
        this.endOfOperation.endOperation();
        process.stdin.resume();
      });
  }
}