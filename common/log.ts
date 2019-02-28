import chalk from 'chalk'
import { isServer } from './globals'

export default {
  info(...args: any[]) {
    if (typeof args[0] === 'object' && isServer) {
      // tslint:disable-next-line:no-console
      console.log(chalk.blue(require('util').inspect(args[0], false, null)))
    } else {
      // tslint:disable-next-line:no-console
      console.log(chalk.blue(...args))
    }
  },
  error(id: string, err: Error = new Error('Unknown error')) {
    // tslint:disable-next-line:no-console
    console.error(
      chalk.bold(chalk.red(err.name), chalk.yellow(id), err.message)
    )
    // tslint:disable-next-line:no-console
    console.error(err)
    // tslint:disable-next-line:no-console
    console.trace()
  },
}
