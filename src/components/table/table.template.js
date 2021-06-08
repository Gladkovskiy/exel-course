const CODES = {
  A: 65,
  Z: 90,
}

function createCell(col) {
  return `
  <div class="cell" contenteditable data-col="${col}"></div>
  `
}

function createCol(nameColumn, index) {
  return `
  <div class="column" data-type="resizable" data-col="${index}">
  ${nameColumn}
  <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(index, content) {
  const resize =
    index === '' ? '' : `<div class="row-resize" data-resize="row"></div>`
  return `
  <div class="row" data-type="resizable">
		<div class="row-info">
    ${index}
    ${resize}
    </div>
		<div class="row-data">${content}</div>
  </div>        
  `
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map((el, index) => String.fromCharCode(CODES.A + index))
    .map((el, index) => createCol(el, index))
    .join('')

  rows.push(createRow('', cols))

  const cell = new Array(colsCount)
    .fill('')
    .map((el, index) => (el = createCell(index)))
    .join('')

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cell))
  }

  return rows.join('')
}
