import process from 'node:process';

export default class UserParams {
  #name
  constructor() {
    const args = process.argv.slice(2);

    this.checkEnteredUserName(args);
  }

  checkEnteredUserName(args) {
    if (args.length > 2) return this.#name = undefined;

    let ctrlArg = args[0];

    if (!ctrlArg) return this.#name = null;

    if (ctrlArg === '--') {
      ctrlArg = args[1];
    }

    if (!ctrlArg) return this.#name = null;

    const userParams = ctrlArg.split('=');

    if (userParams[0] !== '--username') return this.#name = null;

    this.#name = userParams[1][0].toUpperCase().concat(userParams[1].slice(1));
  }

  getUserName() {
    return this.#name;
  }
}