export default class CommanderInterface {
  constructor(commandsArray) {
    this.commands = commandsArray;
  }

  checkCommand(commandArr) {
    const command = commandArr[0];
    if (!this.commands.includes(command)) {
      return null;
    };
    
    return commandArr;
  }
}