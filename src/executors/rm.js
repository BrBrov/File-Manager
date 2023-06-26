import * as fs from 'node:fs/promises';
import path from 'node:path';

import EndOfOperation from '../utils/end-of-operation.js';

export default class RmExec {
  constructor(commandLine, osInfo) {
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.#rm(commandLine);
  }

  #rm(commandLine) {
    //TODO
    //[ 'rm', '/folder/my', 'file.txt' ]
    const way = commandLine.slice(1).join(' ');

    let pathTofile;

    if (/\w:(\/|\\)/.test(way)) {
      pathTofile = way;
    } else if(!way.startsWith('/') || !way.startsWith('\\')) {
      pathTofile = '/' + way;
      pathTofile = path.join(this.state.getFSPosition(), pathTofile);
    } else {
      pathTofile = path.resolve(this.state.getFSPosition(), way);
    }

    console.log(pathTofile);

    fs.rm(pathTofile)
    .then(() => {
      const fileName = path.basename(pathTofile);
      this.endOfOperation.outputInfo(`File "${fileName}" was delete!`);
      this.endOfOperation.endOperation();
    })
    .catch(() => {
      this.endOfOperation.outputInfo('Operation failed.');
      this.endOfOperation.endOperation();
    });
  }
}