import CommanderInterface from "../data/commander-interface.js";
import { navigation } from "../data/commands.js";

export default class FSNavigation extends CommanderInterface{
  constructor(state) {
    super(navigation);
    this.state = state;
  }

  commandsHandler(commandLine) {
    const command = commandLine[0];
    if (commandLine.length == 0 || commandLine.length > 2) {
      return null;
    }
  }

}