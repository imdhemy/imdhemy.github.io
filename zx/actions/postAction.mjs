import { info, success } from '../output.mjs'

const execute = (title) => {
  info(`Creating new post: ${title}`)

  const today = (new Date()).toISOString().slice(0, 10)
  const fileName = `${today}-${_slugify(title)}.md`

  // @TODO: create file

  success(`Post Created: ${fileName}`)
}

const _slugify = text =>
  text.toString().
    normalize('NFD').
    replace(/[\u0300-\u036f]/g, '').
    toLowerCase().
    trim().
    replace(/\s+/g, '-').
    replace(/[^\w-]+/g, '').
    replace(/--+/g, '-')

export {
  execute,
}