import { allCommands } from '../data/commands.js';
import EndOfOperation from '../utils/end-of-operation.js';

export default class OSInformation {
  constructor(state) {
    this.state = state;
    this.eofp = new EndOfOperation(state);
  }

  getHomeDir() {
    this.eofp.outputInfo(`Home directory: ${this.state.homedir}`);
    this.eofp.endOperation();
  }

  getEOL() {
    let eol = '';
    for (let i = 0; i < this.state.eol.length; i += 1) {

      if(this.state.eol[i] === '\r') {
        eol += '\\r';
      }

      if(this.state.eol[i] === '\n') {
        eol += '\\n';
      }
    }
    this.eofp.outputInfo(`Default system End-Of-Line: \'${eol}\'`);
    this.eofp.endOperation();
  }

  getCPUs() {
    const { log, table } = console;
    const cores = this.state.cpus.length;
    const cpusInfo = {};

    this.state.cpus.forEach((info, index) => {
      const infoOfOneCore = {
        model: info.model,
        speed: `${info.speed / 1000}GHz`
      }
      cpusInfo[`core ${index + 1}`] = infoOfOneCore;
    });

    log(`Number of processor cores ${cores}\n\n`);
    log('Cores information:');
    table(cpusInfo);
    log('\n');
    this.eofp.endOperation();
  }

  getARCH() {
    this.eofp.outputInfo(`CPU architecture : ${this.state.arch}`);
    this.eofp.endOperation();
  }

  getUser() {
    this.eofp.outputInfo(`Current system user name ${this.state.username}`);
    this.eofp.endOperation();
  }

  processCommand(commandLine) {
    const index = allCommands.osInfo.indexOf(commandLine);

    switch (index) {
      case 0:
        this.getEOL();
        break;
      case 1:
        this.getCPUs();
        break;
      case 2:
        this.getHomeDir();
        break;
      case 3:
        this.getUser();
        break;
      case 4:
        this.getARCH();
        break;
      default:
        this.eofp.outputInfo(`Incorrect entered parameters os!`);
        this.eofp.endOperation();
        break;
    }
  }
}