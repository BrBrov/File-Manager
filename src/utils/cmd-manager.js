import State from '../data/state.js';
import EventCommander from '../handlers/command-handler.js';
import STDInput from './std-input.js';

export default class CMDManager {
  constructor(userName) {
    this.osInfo = new State(userName);
    this.eventCommander = new EventCommander(this.osInfo);
    this.stdInput = new STDInput(this.eventCommander);
  }
}