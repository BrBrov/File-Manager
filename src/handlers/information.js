import EndOfOperation from '../utils/end-of-operation';

export default class OSInformation {
  constructor(state) {
    this.state = state;
    this.eofp = new EndOfOperation(state);
  }

  homeDir() {
    this.eofp.outputInfo(this.state.homedir);
    this.eofp.endOperation();
  }

  getEOL() {
    this.eofp.outputInfo(this.state.eol);
    this.eofp.endOperation();
  }

  getCPUs() {
    const { log, table} = console;
    const cores = this.state.cpus.length;
    const cpusInfo = {};

    this.state.cpus.forEach((info, index) => {
      const infoOfOneCore = {
        model: info.model,
        speed: info.speed
      }
      cpusInfo[`core ${index + 1}`] = infoOfOneCore;
    });

    log(cores);
    table(cpusInfo);
    this.eofp.endOperation();
  }

  getARCH() {
    this.eofp.outputInfo(this.state.arch);
    this.eofp.endOperation();
  }

  getUser() {
    this.eofp.outputInfo(this.state.username);
    this.eofp.endOperation();
  }

}