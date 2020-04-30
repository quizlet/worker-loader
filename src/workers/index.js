/* eslint-disable multiline-ternary */
import path from 'path';
import loaderUtils from 'loader-utils';

const getWorker = (plugin, file, content, options) => {
  const publicPath = options.publicPath
    ? loaderUtils.stringifyRequest(plugin, options.publicPath)
    : '__webpack_public_path__';

  const publicWorkerPath = `${publicPath} + ${loaderUtils.stringifyRequest(
    plugin,
    file
  )}`;

  if (options.inline) {
    const InlineWorkerPath = loaderUtils.stringifyRequest(
      plugin,
      `!!${path.join(__dirname, 'InlineWorker.js')}`
    );

    const fallbackWorkerPath =
      options.fallback === false ? 'null' : publicWorkerPath;

    return `require(${InlineWorkerPath})(${JSON.stringify(
      content
    )}, ${fallbackWorkerPath})`;
  }

  return `new Worker(${publicWorkerPath})`;
};

export default getWorker;
