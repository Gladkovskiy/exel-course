import {ExcelComponents} from '../../core/ExcelComponent.js'
import {createTable} from './table.template.js'

export class Table extends ExcelComponents {
  static className = 'exel__table'

  toHtml() {
    return createTable(20)
  }
}
