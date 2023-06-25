export default class DeepParse {
  parse(commandLine) {

    const arrString = commandLine.split(' ');

    const command = arrString[0];

    const pathWays = arrString.slice(1).join(' ');

    const separator = this.#defineSeparator(pathWays);

    return this.#handleCommandValues(pathWays, separator);
  }

  #defineSeparator(pathWays) {
    let separator
    if (pathWays[0] === '/' || pathWays[0] === '\\') {
      separator = pathWays[0] === '/' ? '/' : '\\';
    } else {
      separator = null;
    }

    if (separator === null) {
      if (pathWays.slice(1, 2) === ':') {
        separator = pathWays.slice(2, 3);
      }
    }

    return separator;
  }

  #handleCommandValues(pathWays, separator) {
    let pathArr;

    const result = {
      result: '',
      isData: false
    }

    const pathCtrl = ''.concat(pathWays);

    if (pathCtrl.search(` \\w\:${separator}`) !== -1) {
      const fPath = pathWays.slice(0, pathWays.search(` \\w\:${separator}`));
      const sPath = pathWays.slice(pathWays.search(` \\w\:${separator}`)).trim();

      if (!fPath.startsWith('/')) {
        result.result = 'Wrong first path!';
        return result;
      }

      if (sPath.search(` \\w\:${separator}`) !== -1 || sPath.includes(` ${separator}`)) {
        result.result = 'Wrong second path!';
        return result;
      }

      pathArr = [fPath, sPath];

    } else {

      pathArr = pathWays.split(` ${separator}`);

      if (pathArr.length < 2 || pathArr > 2) {
        result.result = 'Wrong paths in command!';
        return result;
      }

      if (pathArr[1].search(` \\w\:${separator}`) !== -1 || pathArr.includes(' /')) {
        result.result = 'Wrong second path!';
        return result;
      }


    }
    result.result = pathArr;
    result.isData = true;
    return
  }
}