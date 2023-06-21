import { allCommands } from '../data/commands.js';
import EndOfOperation from './end-of-operation.js';
import OSInformation from '../handlers/information.js';


export default class CommandsParser {
  constructor(commandLine, emitter, osInfo) {
    this.commandLine = commandLine;
    this.emitter = emitter;
    this.osInfo = osInfo;
    this.parse(this.commandLine);
  }

  parse(commandLine) {
    const stringArrLine = commandLine.split(' ');

    if (stringArrLine.length > 3) {
      return this.#outputError();
    }

    console.log(stringArrLine);

    switch(stringArrLine[0]) {
      case 'os':
          this.emitter.emit('information', commandLine, new OSInformation(this.osInfo));
        break;
    }
    
  }

  #outputError() {
    const endOperation = new EndOfOperation(this.osInfo);
    endOperation.outputInfo(`Wrong entered command!`);
    endOperation.endOperation();
  }

}

