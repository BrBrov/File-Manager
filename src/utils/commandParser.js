class CommandsParser {

  parse(line) {
    const stringArrLine = line.split(' ');

    return stringArrLine.length > 3 ? stringArrLine.slice(0, 3) : stringArrLine;
  }

}

export default new CommandsParser().parse;