const CODES = {
  A: 65,
  Z: 90,
}

function createCell(col, row) {
  return `
  <div class="cell" contenteditable data-id="${row}:${col}" 
  data-col="${col}" data-type="cell"></div>
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

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map((el, col) => (el = createCell(col, row)))
      .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
