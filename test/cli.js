import path from 'path'
import chai from 'chai'
import Cli from '../lib/cli'


const should = chai.should();

describe('Cli', () => {
  describe('#run()', () => {
    it('should return 0 when working', function (done) {
      process.on('exit', (code) => {
        code.should.be.eql(0)
        done()
      })

      const fixtures = path.join(__dirname, 'fixtures')
      const args = [
        'node',
        'bin\\greplint-cli.js',
        '--help'
        ]
      console.log('------------------', new Cli().run(args));
    })
  })
})
