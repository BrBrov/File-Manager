import CommanderInterface from "../data/commander-interface.js";
import EndOfOperation from '../utils/end-of-operation.js';
import { allCommands } from "../data/commands.js";
import HashExec from '../executors/hash.js';

export default class Hash extends CommanderInterface {
  constructor(state) {
    super(allCommands.hash);
    this.state = state;
    this.endOfOperation = new EndOfOperation(this.state);
  }

  commandsHandler(commandArr) {
    if (commandArr.length > 2) {
      this.#showError('Invalid input!');
    } else {
      new HashExec(commandArr, this.state);
    }
  }

  processCommand(commandArr) {
    const command = commandArr[0];
    const pathWay = commandArr.slice(1).join(' ');

    const fullCommand = [ command, pathWay ];
    if (super.checkCommand(fullCommand)) {
      this.commandsHandler(fullCommand);
    } else {
      this.#showError(`Invalid input.\nSomthing went wront with \'${commandArr[0]}\'`);
    }
  }

  #showError(errorText) {
    this.endOfOperation.outputInfo(errorText);
    this.endOfOperation.endOperation();
  }
}