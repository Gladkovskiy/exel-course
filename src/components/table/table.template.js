import {defaulteStyle} from '../../constants'
import {parse} from '../../core/parse'
import {toInlineStyles} from '../../core/utils'

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HIGHT = 24

function getWidth(state, index) {
  return (state.colState[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state.rowState[index] || DEFAULT_HIGHT) + 'px'
}

function createCell(col, row, width, state) {
  const id = `${row}:${col}`
  const data = state.dataState[id]
  const style = toInlineStyles({...defaulteStyle, ...state.stylesState[id]})
  return `
  <div 
  class="cell" 
  contenteditable 
  data-id="${id}" 
  data-col="${col}" 
  data-type="cell"
  data-value="${data || ''}" 
  style="${style}; width: ${width}">
  ${parse(data) || ''}
  </div>
  `
}

function createCol(nameColumn, index, width) {
  return `
  <div class="column" data-type="resizable" data-col="${index}" 
  style="width: ${width}">
  ${nameColumn}
  <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(index, content, state) {
  const resize =
    index === '' ? '' : `<div class="row-resize" data-resize="row"></div>`
  const height = getHeight(state, index)
  return `
  <div class="row" 
  data-type="resizable" 
  data-row="${index}" 
  style="height: ${height}">
		<div class="row-info">
    ${index}
    ${resize}
    </div>
		<div class="row-data">${content}</div>
  </div>        
  `
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map((el, index) => String.fromCharCode(CODES.A + index))
    .map((el, index) => {
      const width = getWidth(state, index)
      return createCol(el, index, width)
    })
    .join('')

  rows.push(createRow('', cols, state))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map((el, col) => {
        const width = getWidth(state, col)
        return createCell(col, row, width, state)
      })
      .join('')

    rows.push(createRow(row + 1, cells, state))
  }

  return rows.join('')
}
