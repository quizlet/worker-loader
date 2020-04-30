'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable multiline-ternary */
const getWorker = (plugin, file, content, options) => {
  const publicPath = options.publicPath ? _loaderUtils2.default.stringifyRequest(plugin, options.publicPath) : '__webpack_public_path__';

  const publicWorkerPath = `${publicPath} + ${_loaderUtils2.default.stringifyRequest(plugin, file)}`;

  if (options.inline) {
    const InlineWorkerPath = _loaderUtils2.default.stringifyRequest(plugin, `!!${_path2.default.join(__dirname, 'InlineWorker.js')}`);

    const fallbackWorkerPath = options.fallback === false ? 'null' : publicWorkerPath;

    return `require(${InlineWorkerPath})(${JSON.stringify(content)}, ${fallbackWorkerPath})`;
  }

  return `new Worker(${publicWorkerPath})`;
};

exports.default = getWorker;