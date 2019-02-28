import chalk from 'chalk'

export default {
  info(...args: any[]) {
    // tslint:disable-next-line:no-console
    console.log(chalk.blue(...args))
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
