'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _greplint = require('greplint');

var _greplint2 = _interopRequireDefault(_greplint);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cli = function () {
  function Cli() {
    var _this = this;

    _classCallCheck(this, Cli);

    this._program = _commander2.default;
    this._program.version('' + _package2.default.version).description('' + _package2.default.description).usage('<path>').option('-C, --no-color', 'Uncolorize output').option('-e, --expression <exp>', 'Grep expression').action(function (path) {
      return new _greplint2.default(path, { verbose: _this._program.verbose }).lint(_this._program.expression).then(function (values) {
        values.forEach(function (value) {
          return _this.prettyprint(value);
        });
        return 0;
      }, _this).catch(function (err) {
        console.log(err);
        return -1;
      });
    });
  }

  _createClass(Cli, [{
    key: 'prettyprint',
    value: function prettyprint(found) {
      var chalk = new _chalk2.default.constructor({ enabled: this._program.color ? true : false });
      var filename = chalk.red(found.filename + ':');
      var lineCol = chalk.green('line ' + found.lineNumber + ', col ' + found.index + ',');
      var source = chalk.white('' + found.value);

      console.log(filename, lineCol, source);
    }
  }, {
    key: 'run',
    value: function run(args) {
      if (args.length < 2) {
        console.log('Few arguments');
        return;
      }
      if (args.length === 2) {
        this._program.help();
      }
      this._program.parse(args);
    }
  }]);

  return Cli;
}();

exports.default = Cli;
//# sourceMappingURL=cli.js.map