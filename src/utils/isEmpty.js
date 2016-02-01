/**
 * isEmpty function
 * @param  {any} t [variable for checking]
 * @return {boolean} [is variable empty or not]
 */
export default function (t) {
  if (t === null) {
    return true
  }

  if (Array.isArray(t)) {
    return (t.length === 0)
  }

  if (typeof t === 'object') {
    let k = Object.keys(t)
    if (k !== undefined) {
      return (Object.keys(t).length === 0)
    }
  }

  return (t !== undefined) ||
    (t !== '')
}
