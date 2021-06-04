const CODES = {
  A: 65,
  Z: 90,
}

function createCell() {
  return `
  <div class="cell" contenteditable></div>
  `
}

function createCol(nameColumn) {
  return `
  <div class="column">
  ${nameColumn}
  </div>
  `
}

function createRow(index, content) {
  return `
  <div class="row">
		<div class="row-info">${index}</div>
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
    .map(el => createCol(el))
    .join('')

  rows.push(createRow('', cols))

  const cell = new Array(colsCount).fill(createCell()).join('')

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(i + 1, cell))
  }

  return rows.join('')
}
