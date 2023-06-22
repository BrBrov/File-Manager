import path from 'node:path';
import * as fs from 'node:fs/promises';

import CommanderInterface from "../data/commander-interface.js";
import EndOfOperation from '../utils/end-of-operation.js';
import { allCommands } from "../data/commands.js";
import UpExec from '../executors/up.js';
import CdExec from '../executors/cd.js';

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
          new UpExec(this.state);
        }
        break;
      case this.commands[1]:
        //TODO: cd command
        if (!commandArr[1] || commandArr.length > 2) {
          this.#showError('Icorrect entered command \'cd\'!');
        } else {
          new CdExec(commandArr[1], this.state);
        }
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

  #showError(errorText) {
    this.endOfOperation.outputInfo(errorText);
    this.endOfOperation.endOperation();
  }

}