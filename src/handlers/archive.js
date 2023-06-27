import { allCommands } from '../data/commands.js';
import CommanderInterface from '../data/commander-interface.js';
import EndOfOperation from '../utils/end-of-operation.js';
import ConmpressExec from '../executors/compress.js';
import DecompressExec from '../executors/decompress.js';

export default class Archive extends CommanderInterface {
  constructor(osInfo) {
    super(allCommands.archive);
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
  }

  #commandsHandler(commandLine) {
    switch (commandLine[0]) {
      case 'compress':
        new ConmpressExec(commandLine, this.state);
        break;
      case 'decompress':
        new DecompressExec(commandLine, this.state);
        break;
      default:
        this.#showError('Invalid input');
        break;
    }
  }

  processCommand(commandLine) {
    if (this.checkCommand(commandLine)) {
      this.#commandsHandler(commandLine);
    } else {
      this.#showError('Invalid input');
    }
  }

  #showError(errorText) {
    this.endOfOperation.outputInfo(errorText);
    this.endOfOperation.endOperation();
  }
}