import os from 'node:os';
import path from 'node:path';

export default class State {
  #fsPosition;
  
  constructor(nameOfCurrentUser) {
    this.osSeparator = path.sep;

    this.eol = os.EOL;
    
    this.cpus = os.cpus();

    this.homedir = os.homedir();

    this.username = os.userInfo().username;

    this.arch = os.arch();

    this.currentUser = nameOfCurrentUser;

    this.setFSPosition(this.homedir);
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