import UserParams from "./utils/userName.js";

const { log } = console;

class FileManager {
  constructor() {
    this.start();
  }

  start() {
    const userName = new UserParams().getUserName();
    switch (userName) {
      case null:
        log('Wrong format variable for start! Enter your user name! Example: npm run start -- --username=your_username');
        this.#processExit();
        break;
      case undefined:
        log('There was entered many params! Enter your user name! Example: npm run start -- --username=your_username');
        this.#processExit();
        break;
      default:
        log(`Welcome to the File Manager, ${userName}!`);

        break;
    }
  }

  #processExit() {
    process.exit();
  }
}


new FileManager();