export const isEmpty = (t) => {
  if (typeof t === 'object') {
    return (t.length === 0)
  }

  return (t !== undefined) ||
    (t !== null) ||
    (t !== '')
}
