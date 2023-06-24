import path from 'node:path';
import * as fs from 'node:fs/promises';

import EndOfOperation from '../utils/end-of-operation.js';

export default class LsExec {
  constructor(osInfo) {
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    process.stdin.pause();
    this.#ls().then(() => {
      process.stdin.resume();
      this.endOfOperation.endOperation();
    })
  }

  async #ls() {
    const { table, dir } = console;
    try {
      const arrDirent = await fs.readdir(this.state.getFSPosition(), {withFileTypes: true});

      const lsDirectory = [];
      const lsFiles = [];

      arrDirent.forEach(dirent => {
        const recInfo = {
          'Name': dirent.name,
          'Type': ''
        };

        if(dirent.isFile()) {
          recInfo.Type = 'file';
          lsFiles.push(recInfo);
        }

        if(dirent.isDirectory()) {
          recInfo.Type = 'directory';
          lsDirectory.push(recInfo);
        }
      });
      
      table([...lsDirectory, ...lsFiles]);
    } catch(e) {
      this.endOfOperation.outputInfo(e.message);
    }
  }
}