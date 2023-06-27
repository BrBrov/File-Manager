export default class DeepParse {
  getSeparator(commandLine) {
    const pathArr = commandLine.slice(1).join(' ');

    let separator = null;

    if (pathArr.includes('/')) {
      return '/';
    }

    if (pathArr.includes('\\')) {
      return '\\';
    }

    if (!separator) {
      return null;
    }
  }

  parse(commandLine, separator) {
    const pathArr = commandLine.slice(1).join(' ');

    let from, to;
    const pathRef = pathArr.split(` ${separator}`);

    [from, to] = pathRef;

    if (pathRef.length !== 2) {
      if (/\s\w:(\/|\\)/.test(pathArr)) {
        const index = pathArr.search(/\s\w:(\/|\\)/);
        from = pathArr.slice(0, index);
        to = pathArr.slice(index + 1);
      } else {
        return null;
      }
    }

    if (from.slice(0, 1) !== separator) {
      from = separator + from;
    }

    to = separator.concat(to);
    return [from, to];
  }
}