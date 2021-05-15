import { error, info, success } from '../output.mjs'

async function _fileExists (fullPath) {
  try {
    await fs.readFile(fullPath)
    return true
  } catch (exception) {
    return false
  }
}

function _getPostData (title, category) {
  let now = new Date()
  const today = now.toISOString().slice(0, 10)
  const fileName = `${today}-${_slugify(title)}.md`
  const directory = category ? `_posts/${category}` : `_posts/`
  const fullPath = `${directory}/${fileName}`
  return { now, directory, fullPath }
}

async function _buildPostTemplate (title, now, category) {
  return (await fs.readFile('zx/stubs/post.stub')).
    toString().
    replace('$title', title).
    replace('$date', now.toISOString()).
    replace('$category', category || '')
}

async function _createPost ($, directory, stub, fullPath) {
  await $`mkdir -p ${directory}`
  await $`echo ${stub} >> ${fullPath}`
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

const execute = async ($, title, category) => {
  info(`Creating new post: ${title}`)

  let { now, directory, fullPath } = _getPostData(title, category)

  let exists = await _fileExists(fullPath)
  if (exists) {
    error(`Post already exists at ${fullPath}`)
    process.exit(1)
  }

  let stub = await _buildPostTemplate(title, now, category)
  await _createPost($, directory, stub, fullPath)

  success(`Post Created: ${fullPath}`)
}

export {
  execute,
}