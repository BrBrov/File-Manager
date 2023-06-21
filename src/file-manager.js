import UserParams from './utils/userName.js';
import CMDManager from './utils/cmdManager.js';

class FileManager {
  constructor() {
    this.start();
  }

  start() {
    const { log } = console;
    const userName = new UserParams().getUserName();
    switch (userName) {
      case null:
        log('Wrong format variable for start! Enter your user name! Example: npm run start -- --username=your_username');
        this.#processExit(9);
        break;
      case undefined:
        log('There was entered many params! Enter your user name! Example: npm run start -- --username=your_username');
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