import chalk from 'chalk'

export function log(...args: any[]) {
  // tslint:disable-next-line:no-console
  console.log(chalk.blue(...args))
}

export function error(id: string, err: Error = new Error('Unknown error')) {
  // tslint:disable-next-line:no-console
  console.error(chalk.red(err.name), chalk.yellow(id), err.message)
  // tslint:disable-next-line:no-console
  console.error(err)
  // tslint:disable-next-line:no-console
  console.trace()
}
