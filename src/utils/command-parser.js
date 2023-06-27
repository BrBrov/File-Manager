import { allCommands } from '../data/commands.js';
import EndOfOperation from './end-of-operation.js';

export default class CommandsParser {
  constructor(commandLine, emitter, osInfo) {
    this.commandLine = commandLine;
    this.emitter = emitter;
    this.osInfo = osInfo;
    this.parse(this.commandLine);
  }

  parse(commandLine) {
    const stringArrLine = commandLine.split(' ');

    if (stringArrLine.length === 0 || !stringArrLine[0]) return this.#outputError('Invalid input.\nCommand line is empty!');

    if(stringArrLine[0] === 'os') {
      return this.emitter.emit('information', commandLine);
    }
    
    if (allCommands.navigation.includes(stringArrLine[0])) {
      return this.emitter.emit('navigate', stringArrLine);
    }

    if (allCommands.hash.includes(stringArrLine[0])) {
      return this.emitter.emit('hash', stringArrLine);
    }

    if (allCommands.fileOperation.includes(stringArrLine[0])) {
      return this.emitter.emit('fileschange', stringArrLine);
    }

    if (allCommands.archive.includes(stringArrLine[0])) {
      return this.emitter.emit('archive', stringArrLine);
    }

    this.#outputError('Invalid input!');
  }

  #outputError(stringError) {
    const endOperation = new EndOfOperation(this.osInfo);
    endOperation.outputInfo(stringError);
    endOperation.endOperation();
  }
}

