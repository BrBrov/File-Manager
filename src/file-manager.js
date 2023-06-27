import UserParams from './utils/user-name.js';
import CMDManager from './utils/cmd-manager.js';

class FileManager {
  constructor() {
    this.start();
  }

  start() {
    const { log } = console;
    const userName = new UserParams().getUserName();
    switch (userName) {
      case null:
        log('Invalid inpaut.\nWrong format variable for start! Enter your user name! Example: npm run start -- --username=your_username');
        this.#processExit(9);
        break;
      case undefined:
        log('Invalid inpaut.\nThere was entered many params! Enter your user name! Example: npm run start -- --username=your_username');
        this.#processExit(9);
        break;
      default:
        log(`Welcome to the File Manager, ${userName}!`);
        const cmd = new CMDManager(userName);
        break;
    }
  }

  #processExit() {
    process.exit();
  }
}


new FileManager();