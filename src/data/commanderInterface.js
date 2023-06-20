
export default class CommanderInterface {
  constructor(commandsArray) {
    this.commands = commandsArray;
  }

  getCommand(commandLine) {
    const command = commandLine[0];
    if (this.commands.includes(command)) return null;
    this.commandsHandler(commandLine);
  }
}