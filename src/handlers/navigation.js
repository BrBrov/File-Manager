import CommanderInterface from "../data/commander-interface.js";
import EndOfOperation from '../utils/end-of-operation.js';
import { allCommands } from "../data/commands.js";

export default class FSNavigation extends CommanderInterface {
  constructor(state) {
    super(allCommands.navigation);
    this.state = state;
    this.endOfOperation = new EndOfOperation(this.state);
  }

  commandsHandler(commandArr) {
    const command = commandArr[0];
    if (commandArr.length > 2) {
      this.#showError('Invalid entered command!');
    }

    switch (command) {
      case this.commands[0]:
        if (commandArr[1]) {
          this.#showError('Icorrect entered command \'up\'!');
        } else {
          this.#up();
        }
        break;
      case this.commands[1]:
        //TODO: cd command
        break;
      case this.commands[2]:
        //TODO: ls command
        break;
      default:
        this.#showError('Unknown command!');
        break;
    }
  }

  processCommand(commandArr) {
    if (super.checkCommand(commandArr)) {
      this.commandsHandler(commandArr);
    }
  }

  #up() {
    const currentPath = this.state.getFSPosition();
    let curPathArr = currentPath.split(this.state.osSeparator);

    if (curPathArr.length === 1) {
      return this.endOfOperation.endOperation();
    }
    
    curPathArr = curPathArr.slice(0, -1);

    this.state.setFSPosition(curPathArr.join(this.state.osSeparator));

    this.endOfOperation.endOperation();
  }

  #showError(errorText) {
    this.endOfOperation.outputInfo(errorText);
    this.endOfOperation.endOperation();
  }

}