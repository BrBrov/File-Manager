import process from 'node:process';

export default class STDInput {
  constructor(eventCommander) {
    this.input = process.stdin;
    this.emitter = eventCommander.emitter;
    this.userName = eventCommander.getCurrentUser();

    process.stdin.on('data', data => {
      const commandLine = data.toString().slice(0, -2);

      if (commandLine === '.exit') {
        return this.#exitApp();
      }
      this.emitter.emit('oncommand', commandLine);
    });

    process.on('SIGINT', () => this.#exitApp());
  }

  #exitApp() {
    console.log(`Thank you for using File Manager, ${this.userName}, goodbye!`);
    process.exit();
  }
}