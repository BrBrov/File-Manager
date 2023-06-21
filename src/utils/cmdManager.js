import State from '../data/state.js';
import EventCommander from '../handlers/commandHandler.js';
import STDInput from './stdInput.js';

export default class CMDManager {
  constructor(userName) {
    this.osInfo = new State(userName);
    this.eventCommander = new EventCommander(this.osInfo);
    this.stdInput = new STDInput(this.eventCommander);
  }
}