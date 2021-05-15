import * as postManager from './postAction.mjs'

const create = (type) => {
  switch (type) {
    case 'post':
      return postManager
  }
}

export {
  create,
}