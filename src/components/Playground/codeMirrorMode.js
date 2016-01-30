import { isEmpty } from '../../utils'
/**
 * Get CodeMirror mode for syntax hightlight
 * from default code type or via
 * `parser.codeType`
 * @param  {string} type   [codeType]
 * @param  {object} parser [plugin instance]
 * @return {string}        [CodeMirror mode]
 */
export default function (type, parser) {
  let mode = type
  if (type === 'html') {
    mode = 'htmlmixed'
  }

  if (!isEmpty(parser)) {
    if (parser.length > 1) {
      console.error(
        `Multiple parser for ${type} code type available.` +
        `Using the first one. Others are ommitted`
      )
    }
    // We need this since
    // parsers(codeType) method
    // always return an array
    parser = parser[0]

    if (parser.codeType !== type) {
      console.error(
        `Parser Type ${parser.codeType} is not equal with Code Type ${type}`
      )
    }
    mode = parser.codeMirrorMode
  }

  return mode
}
