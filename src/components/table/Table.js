import {ExcelComponents} from '../../core/ExcelComponent.js'
import {createTable} from './table.template.js'
import {resizeHandler} from './table.resize.js'
import {isCell, matrix, shouldResize, nextSelector} from './table.function.js'
import {TableSelection} from './TableSelection.js'
import {$} from '../../core/dom.js'

export class Table extends ExcelComponents {
  static className = 'exel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'input', 'keydown'],
      ...options,
    })
  }

  toHtml() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)

    this.$emit('table: select', $cell.text())

    this.$on('formula: input', text => this.selection.current.text(text))
    this.$on('formula: done', isEnter => {
      if (isEnter) {
        this.selection.current.focus()
      }
    })
  }

  /**
   *
   * @param {MouseEvent} event
   */
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id =>
          this.$root.find(`[data-id="${id}"]`)
        )
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
      this.$emit('table: select', $target.text())
    }
  }

  /**
   *
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ]

    const {key} = event
    const id = this.selection.current.id(true)
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const $next = this.$root.find(nextSelector(key, id))
      this.selection.select($next)
      this.$emit('table: select', $next.text())
    }
  }

  /**
   *
   * @param {InputEvent} event
   */
  onInput(event) {
    this.$emit('table: input', event.target.textContent)
  }
}
