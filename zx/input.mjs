const validArguments = {
  start: [],
  post: ['title'],
  page: ['title'],
}

const args = () => process.argv.slice(3)
const managerType = () => args()[0]
const params = () => process.argv.slice(4)

const validate = (args) => {
  const messages = []
  let isValid = true
  const argument = args[0]

  if (!Object.keys(validArguments).includes(argument)) {
    isValid = false
    messages.push(
      `Invalid action! Valid actions include (${Object.keys(validArguments).
        join()})`)
  }

  return {
    isValid,
    messages,
  }
}

export {
  args,
  params,
  validate,
  managerType,
}