

import EndOfOperation from '../utils/end-of-operation.js';

export default class UpExec {
  constructor(osInfo) {
    this.state = osInfo;
    this.endOfOperation = new EndOfOperation(this.state);
    this.#up();
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
}