import os from 'node:os';
import path from 'node:path';

export default class State {
  #fsPosition;
  constructor(nameOfCurrentUser) {
    this.eol = os.EOL;
    
    this.cpus = this.#getCPUsInfo();

    this.homedir = os.homedir();

    this.username = os.userInfo().username;

    this.arch = os.arch();

    this.currentUser = nameOfCurrentUser;

    this.setFSPosition(this.homedir);

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

  getCurrentUser() {
    return this.currentUser;
  }

  setFSPosition(position) {
    const normalizePos = path.normalize(position);
    this.#fsPosition = path.resolve(normalizePos);
  }

  getFSPosition() {
    return this.#fsPosition;
  }

}