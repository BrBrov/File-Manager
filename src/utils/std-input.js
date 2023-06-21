import process from 'node:process';

export default class STDInput {
  constructor(eventCommander) {
    this.emitter = eventCommander.emitter;
    this.userName = eventCommander.getCurrentUser();
    console.log(`You are currently in ${eventCommander.osInfo.getFSPosition()}`);

    this.#startInput(eventCommander.osInfo.getFSPosition());
  }

  #startInput(startPath) {
    process.stdin.on('data', data => {
      const commandLine = data.toString().slice(0, -2);

      if (commandLine === '.exit') {
        return this.#exitApp();
      }
      this.emitter.emit('oncommand', commandLine);
    });

    process.on('SIGINT', () => this.#exitApp());

    process.stdout.write(`\n\nPS ${startPath}> `);
  }

  #exitApp() {
    console.log(`Thank you for using File Manager, ${this.userName}, goodbye!`);
    process.exit();
  }
}