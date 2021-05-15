#!/usr/bin/env zx

import * as input from './zx/input.mjs'
import * as output from './zx/output.mjs'
import * as actionFactory from './zx/actions/actionFactory.mjs'

if (input.args().length) {
  const { isValid, messages } = input.validate(input.args())

  if (!isValid) {
    messages.forEach((message) => output.error(message))
  }

  const action = actionFactory.create(input.managerType())
  const params = input.params()
  params.unshift($)

  await action.execute(...params)

  process.exit(0)
}

output.info(
  'Preparation can only take you so far, after that you\'ve got to take a few leaps of faith. - Michael Scofield, Prison Break.')