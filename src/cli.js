import commander from 'commander'
import Chalk from 'chalk'
import Greplint from 'greplint'
import pack from '../package.json'

export default class Cli {
  constructor() {
    this._program = commander
    this._program.version(`${pack.version}`)
      .description(`${pack.description}`)
      .usage(`<path>`)
      .option('-C, --no-color', 'Uncolorize output')
      .option('-e, --expression <exp>', 'Grep expression')
      .action(path => {
        return new Greplint(path, {verbose: this._program.verbose}).lint(this._program.expression)
          .then(values => {
            values.forEach(value => this.prettyprint(value))
            return 0
          }, this)
          .catch(err => {
            console.log(err)
            return -1
          })
      })
  }

  prettyprint(found) {
    const chalk = new Chalk.constructor({enabled: this._program.color ? true : false})
    const filename = chalk.red(`${found.filename}:`)
    const lineCol = chalk.green(`line ${found.lineNumber}, col ${found.index},`)
    const source = chalk.white(`${found.value}`)

    console.log(filename, lineCol, source)
  }

  run(args) {
    if (args.length < 2) {
      console.log('Few arguments')
      return 
    }
    if (args.length === 2) {
      this._program.help()
    }
    this._program.parse(args)
  }
}
