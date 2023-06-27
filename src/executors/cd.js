import path from 'node:path';
import * as fs from 'node:fs/promises';

import EndOfOperation from '../utils/end-of-operation.js';

export default class CdExec {
  constructor(param, osInfo) {
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.param = param;
    this.#cd(this.param);
  }

  async #cd(param) {
    let newPositionPath;
    if (param.slice(1, 2) === ':') {
      newPositionPath = param;
    } else {
      newPositionPath = path.join(this.state.getFSPosition(), param);
    }

    try {
      const dir = await fs.opendir(newPositionPath);
      this.state.setFSPosition(newPositionPath);
      dir.close();
    } catch (e) {
      this.endOfOperation.outputInfo('Operation failed.\nThe folder path does not exist.\nCheck if the path is correct.');
    } finally {
      this.endOfOperation.endOperation();
    }

  }
}