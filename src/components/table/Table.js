import {ExcelComponents} from '../../core/ExcelComponent.js'
import {createTable} from './table.template.js'
import {resizeHandler} from './table.resize.js'
import {shouldResize} from './table.function.js'

export class Table extends ExcelComponents {
  static className = 'exel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup'],
    })
  }

  toHtml() {
    return createTable(20)
  }
  /**
   *
   * @param {MouseEvent} event
   */
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  onMouseup(event) {}
}
