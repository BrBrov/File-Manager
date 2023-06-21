import { EventEmitter } from 'node:events';
import FSNavigation from './navigation.js';
import CommandParser from '../utils/command-parser.js';

class EventCommandInterface extends EventEmitter {}

export default class EventCommander {
  constructor(osInfo) {
    this.osInfo = osInfo;
    this.navigation = new FSNavigation(this.osInfo);
    //TODO: add others handlers
    this.emitter = new EventCommandInterface();
    this.#setEvents();
  }

  #setEvents() {
    this.emitter.on('navigate', (commandLine, navigate) => navigate.processCommand(commandLine));
    this.emitter.on('fileschange', (commandLine) => console.log(commandLine));
    this.emitter.on('information', (commandLine, osInfoHandler) => osInfoHandler.processCommand(commandLine));
    this.emitter.on('hash', (commandLine) => console.log(commandLine));
    this.emitter.on('archive', (commandLine) => console.log(commandLine));
    this.emitter.on('oncommand', (commandLine) => new CommandParser(commandLine, this.emitter, this.osInfo));
  }

  getCurrentUser() {
    return this.osInfo.getCurrentUser();
  }
}
