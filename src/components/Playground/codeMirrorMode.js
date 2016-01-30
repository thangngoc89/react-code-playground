export default function (type, parser) {
  let result = type

  if (type === 'html') {
    result = 'htmlmixed'
  }

  if (parser !== undefined) {
    if (parser.type !== type) {
      throw new TypeError(
        `Parser Type ${parser.type} is not equal with Code Type ${type}`
      )
    }
    result = parser.codeMirrorMode
  }

  return result
}
