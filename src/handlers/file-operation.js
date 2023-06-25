import { allCommands } from '../data/commands.js';
import CommanderInterface from '../data/commander-interface.js';
import EndOfOperation from '../utils/end-of-operation.js';
import CatExec from '../executors/cat.js';

export default class FileOperation extends CommanderInterface {
  constructor(osInfo) {
    super(allCommands.fileOperation);
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
  }

  #commandsHandler(commandLine) {
    switch (commandLine[0]) {
      case 'cat':
        //TODO: cat
        new CatExec(this.state, commandLine);
        break;
      case 'add':
        //TODO: add
        break;
      case '':
        //TODO: rename
        break;
      case 'cp':
        //TODO: copy file
        break;
      case 'mv':
        //TODO: move file
        break;
      case 'rm':
        //TODO: delete
        break;
      default:
        break;
    }
  }

  processCommand(commandLine) {
    if (this.checkCommand(commandLine)) {
      this.#commandsHandler(commandLine);
    } else {
      this.#showError('Invalid command');
    }
  }

  #showError(errorText) {
    this.endOfOperation.outputInfo(errorText);
    this.endOfOperation.endOperation();
  }
}