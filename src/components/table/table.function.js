import {range} from '../../core/utils'

/**
 *
 * @param {MouseEvent} event
 * @return {*}
 */
export function shouldResize(event) {
  return event.target.dataset.resize
}
/**
 *
 * @param {MouseEvent} event
 * @return {*}
 */
export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const rows = range(current.row, target.row)
  const cols = range(current.col, target.col)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col--
      break
    case 'ArrowUp':
      row--
      break
  }
  if (row < 0) {
    row = 0
  }
  if (col < 0) {
    col = 0
  }
  return `[data-id="${row}:${col}"]`
}
