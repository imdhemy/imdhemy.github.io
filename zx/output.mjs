import chalk from 'chalk'

const info = (msg) => blue(`Info: ${msg}`)
const error = msg => red(`Error: ${msg}`)
const success = msg => green(`Success: ${msg}`)

const black = (msg) => console.log(chalk.black(msg))
const red = (msg) => console.log(chalk.red(msg))
const green = (msg) => console.log(chalk.green(msg))
const yellow = (msg) => console.log(chalk.yellow(msg))
const blue = (msg) => console.log(chalk.blue(msg))
const magenta = (msg) => console.log(chalk.magenta(msg))
const cyan = (msg) => console.log(chalk.cyan(msg))
const white = (msg) => console.log(chalk.white(msg))
const gray = (msg) => console.log(chalk.gray(msg))
const redBright = (msg) => console.log(chalk.redBright(msg))
const greenBright = (msg) => console.log(chalk.greenBright(msg))
const yellowBright = (msg) => console.log(chalk.yellowBright(msg))
const blueBright = (msg) => console.log(chalk.blueBright(msg))
const magentaBright = (msg) => console.log(chalk.magentaBright(msg))
const cyanBright = (msg) => console.log(chalk.cyanBright(msg))
const whiteBright = (msg) => console.log(chalk.whiteBright(msg))

export {
  info,
  error,
  success,
  //
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  gray,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
}