import path from 'node:path';

import { allCommands } from '../data/commands.js';
import EndOfOperation from './end-of-operation.js';
import OSInformation from '../handlers/information.js';
import FSNavigation from '../handlers/navigation.js';


export default class CommandsParser {
  constructor(commandLine, emitter, osInfo) {
    this.commandLine = commandLine;
    this.emitter = emitter;
    this.osInfo = osInfo;
    this.parse(this.commandLine);
  }

  parse(commandLine) {
    const stringArrLine = commandLine.split(' ');


    if (stringArrLine.length === 0 || !stringArrLine[0]) return this.#outputError('Command line is empty! Enter your command or enter help to look at commands cheatsheet.');

    console.log(stringArrLine); //TODO: delete it after dev!

    if(stringArrLine[0] === 'os') {
      return this.emitter.emit('information', commandLine, new OSInformation(this.osInfo));
    }
    
    if (allCommands.navigation.includes(stringArrLine[0])) {
      return this.emitter.emit('navigate', stringArrLine, new FSNavigation(this.osInfo));
    }

    if (allCommands.hash.includes(stringArrLine[0])) {
      return this.emitter.emit('hash', stringArrLine);
    }

    this.#outputError('Entered command is wrong!');
  }

  #outputError(stringError) {
    const endOperation = new EndOfOperation(this.osInfo);
    endOperation.outputInfo(stringError);
    endOperation.endOperation();
  }

}

