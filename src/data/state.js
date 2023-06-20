import os from 'node:os';
import url from 'node:url';
import path from 'node:path';

export default class State {
  #dirname
  constructor(nameOfCurrentUser) {
    this.eol = os.EOL;
    
    this.cpus = this.#getCPUsInfo();

    this.homedir = os.homedir();

    this.username = os.userInfo().username;

    this.arch = os.arch();

    this.currentUser = nameOfCurrentUser;

    this.#getCurrentFolder();

    this.cwdText = `PS ${this.#dirname}`;
  }

  #getCPUsInfo() {
    const cpus = os.cpus();

    const cores = cpus.length;

    const cpusInfo = {
      'coresCount': cores
    };

    cpus.forEach((info, index) => {
      const infoOfOneCore = {
        model: info.model,
        speed: info.speed
      }
      cpusInfo[`core ${index + 1}`] = infoOfOneCore;
    });

    return cpusInfo;
  }

  #getCurrentFolder() {
    const filename = url.fileURLToPath(import.meta.url);
    this.#dirname = path.dirname(filename);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  getDirname() {
    return this.#dirname;
  }

  unpdateCWDText(folder) {
    this.cwdText = `PS ${this.#dirname}/` + folder; 
  }

}