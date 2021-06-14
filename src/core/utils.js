// pure function - испомогательные функции
export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
  if (start > end) {
    // очень круто менять значения переменных между собой
    // prettier-ignore
    [end, start] = [start, end]
  }
  return new Array(end - start + 1).fill('').map((el, index) => start + index)
}
