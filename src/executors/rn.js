import * as fs from 'node:fs/promises';
import path from 'node:path';

import EndOfOperation from '../utils/end-of-operation.js';

export default class RnExec {
  constructor(commandLine, osInfo) {
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.#rn(commandLine);
  }

  #rn(commandLine) {
    
    const currentPath = this.state.getFSPosition();

    const waysObject = this.#parseLine(commandLine);

    if (!waysObject.isData) {
      return this.#showError(`Invalid input.\n${waysObject.result} \nCheck the spelling of the file paths\nExample: rn /folder/old_name.ext "new_name.ext"`);
    }

    const from = path.join(currentPath, waysObject.result[0]);

    const pathFrom = path.dirname(from);
    const to = path.join(pathFrom, waysObject.result[1]);

    const fileNameBefore = path.basename(from);

    const fileNameAfter = path.basename(to);

    fs.rename(from, to)
    .then(() => {
      this.endOfOperation.outputInfo(`File ${fileNameBefore} was rename to ${fileNameAfter}`);
    })
    .catch(() => {
      this.endOfOperation.outputInfo('Operation failed!\nCheck the spelling of the file paths\nExample: rn /folder/old_name.ext "new_name.ext"');
    })
    .finally(() => {
      this.endOfOperation.endOperation();
    })
  }

  #showError(string) {
    this.endOfOperation.outputInfo(string);
    this.endOfOperation.endOperation();
  }

  #parseLine(commandLine) {
    const pathArr = commandLine.slice(1).join(' ');
    const result = {
      result: '',
      isData: false
    }

    const lastIndexPointExt = pathArr.lastIndexOf('"');

    const startindexOfNewName = pathArr.lastIndexOf('"', lastIndexPointExt - 1);

    if (lastIndexPointExt === -1 || startindexOfNewName === -1) {
      result.result = 'Invalid input.';
      return result;
    }

    const newName = pathArr.slice(startindexOfNewName + 1, lastIndexPointExt);

    const pathToOldName = pathArr.slice(0, startindexOfNewName - 1);

    result.result = [pathToOldName, newName];
    result.isData = true;

    return result;
  }
}