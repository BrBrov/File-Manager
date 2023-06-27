import { EventEmitter } from 'node:events';
import OSInformation from '../handlers/information.js';
import FSNavigation from './navigation.js';
import Hash from './hash.js';
import FileOperation from './file-operation.js';
import CommandParser from '../utils/command-parser.js';
import Archive from './archive.js';

class EventCommandInterface extends EventEmitter {}

export default class EventCommander {
  constructor(osInfo) {
    this.osInfo = osInfo;
    this.emitter = new EventCommandInterface();
    this.#setEvents();
  }

  #setEvents() {
    this.emitter.on('navigate', (commandLine) => new FSNavigation(this.osInfo).processCommand(commandLine));
    this.emitter.on('fileschange', (commandLine) => new FileOperation(this.osInfo).processCommand(commandLine));
    this.emitter.on('information', (commandLine) => new OSInformation(this.osInfo).processCommand(commandLine));
    this.emitter.on('hash', (commandLine) => new Hash(this.osInfo).processCommand(commandLine));
    this.emitter.on('archive', (commandLine) => new Archive(this.osInfo).processCommand(commandLine));
    this.emitter.on('oncommand', (commandLine) => new CommandParser(commandLine, this.emitter, this.osInfo));
  }

  getCurrentUser() {
    return this.osInfo.getCurrentUser();
  }
}
