export default class ShowProcessing {
  #timer
  #conter
  #seconds = 0;

  start() {
    process.stdout.write(`\nProcessing... ${this.#seconds}s`);

    this.#timer = setInterval(() => {
      if(this.#conter < 1200000) {
        this.#seconds += 0.001;
        this.#conter += 1;
        this.#showProcess();
      } else {
        clearInterval(this.#timer);
      }
    }, 1);
  }

  stop() {
    clearInterval(this.#timer);
    process.stdout.write('\r                    ');
    process.stdout.write('\rDone!');
  }

  #showProcess() {
    process.stdout.write('\r                    ');
    process.stdout.write(`Processing... ${this.#seconds}s`);
  }
}