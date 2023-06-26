export default class ShowProcessing {
  #timer
  #conter = 0
  #seconds = 0.0

  start() {
    process.stdout.write(`\nProcessing... ${this.#seconds}s`);

    this.#timer = setInterval(() => {
      if(this.#conter < 12000) {
        this.#seconds += 0.1;
        this.#conter += 1;
        this.#showProcess();
      } else {
        clearInterval(this.#timer);
      }
    }, 100);
  }

  stop() {
    clearInterval(this.#timer);
    process.stdout.write('\r                    ');
    process.stdout.write('\rDone!');
  }

  #showProcess() {
    process.stdout.write('\r                               ');
    process.stdout.write(`Processing... ${Math.trunc(this.#seconds * 10)/10}s`);
  }
}