import * as fs from 'node:fs/promises';
import path from 'node:path';

import EndOfOperation from '../utils/end-of-operation.js';

export default class AddExec {
  constructor(osInfo, commandLine) {
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.#add(commandLine);
  }

  #add(commandLine) {
    const currentPath = this.state.getFSPosition();
    const commandPath = commandLine.slice(1).join(' ');

    const pathToDestination = path.join(currentPath, commandPath);

    const separator = this.#detectSeparator(commandPath);

    const fileName = commandPath.slice(commandPath.lastIndexOf(separator) + 1);

    fs.open(pathToDestination)
      .then(() => {
        this.endOfOperation.outputInfo(`Operation failed.\nFile already exists.`);
        this.endOfOperation.endOperation();
      })
      .catch(() => {
        fs.appendFile(pathToDestination, '')
          .then(() => {
            this.endOfOperation.outputInfo(`File ${fileName} created`);
          })
          .catch(() => {
            this.endOfOperation.outputInfo(`Operation failed!`);
          })
          .finally(() => this.endOfOperation.endOperation());
      })
  }

  #detectSeparator(commandLine) {

    if (commandLine.includes('/')) {
      return '/';
    } else {
      return '\\';
    }
  }

}