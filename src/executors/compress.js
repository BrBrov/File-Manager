import path from 'node:path';
import * as fs from 'node:fs';
import zlib from 'node:zlib';

import DeepParse from '../utils/deep-parse.js';
import EndOfOperation from '../utils/end-of-operation.js';
export default class ConmpressExec extends DeepParse {
  constructor(commandLine, osInfo) {
    super();
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.#compress(commandLine);
  }

  #compress(commandLine) {

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

    const pathArchive = to + '.br';

    const brotti = zlib.createBrotliCompress();

    fs.open(from, (err, fd) => {
      if (err) {
        this.#showError('Operation failed');
      } else {
        const rStream = fs.createReadStream(from);
        const wStream = fs.createWriteStream(pathArchive);

        rStream.pipe(brotti).pipe(wStream);

        wStream.on('finish', () => {
          this.endOfOperation.outputInfo('File was archived');
          this.endOfOperation.endOperation();
        })
      }
    })

  }

  #showError(string) {
    this.endOfOperation.outputInfo(string);
    this.endOfOperation.endOperation();
  }
}