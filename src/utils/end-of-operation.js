export default class EndOfOperation {
  constructor(state) {
    this.state = state;
  }

  endOperation() {
    process.stdout.write(`\n\nYou are currently in ${this.state.getFSPosition()}\n`);
    process.stdout.write(`\nPS ${this.state.getFSPosition()}> `);
  }

  outputInfo(info) {
    process.stdout.write(`\n${info}\n`);
  }  
}