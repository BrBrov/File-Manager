import { allCommands } from '../data/commands.js';
import CommanderInterface from '../data/commander-interface.js';
import EndOfOperation from '../utils/end-of-operation.js';
import CatExec from '../executors/cat.js';
import AddExec from '../executors/add.js';
import RnExec from '../executors/rn.js';
import CpExec from '../executors/cp.js';

export default class FileOperation extends CommanderInterface {
  constructor(osInfo) {
    super(allCommands.fileOperation);
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
  }

  #commandsHandler(commandLine) {
    switch (commandLine[0]) {
      case 'cat':
        new CatExec(this.state, commandLine);
        break;
      case 'add':
        new AddExec(this.state, commandLine);
        break;
      case 'rn':
        new RnExec(commandLine, this.state);
        break;
      case 'cp':
        new CpExec(commandLine, this.state);
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