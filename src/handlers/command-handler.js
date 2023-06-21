import { EventEmitter } from 'node:events';
import FSNavigation from './navigation.js';

class EventCommandInterface extends EventEmitter {
  constructor(osInfo) {
    super();
  }
}

export default class EventCommander {
  constructor(osInfo) {
    this.osInfo = osInfo;
    this.navigation = new FSNavigation(this.osInfo);
    //TODO: add others handlers
    this.emitter = new EventCommandInterface();
    this.#setEvents();
  }

  #setEvents() {
    this.emitter.on('navigate', (commandLine) => console.log(commandLine));
    this.emitter.on('fileschange', (commandLine) => console.log(commandLine));
    this.emitter.on('information', (commandLine) => console.log(commandLine));
    this.emitter.on('hash', (commandLine) => console.log(commandLine));
    this.emitter.on('archive', (commandLine) => console.log(commandLine));
    this.emitter.on('oncommand', (commandLine) => console.log(commandLine));
  }

  getCurrentUser() {
    return this.osInfo.getCurrentUser();
  }
}
