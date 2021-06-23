import {ExcelComponents} from '../../core/ExcelComponent.js'
import {createTable} from './table.template.js'
import {resizeHandler} from './table.resize.js'
import {isCell, matrix, shouldResize, nextSelector} from './table.function.js'
import {TableSelection} from './TableSelection.js'
import {$} from '../../core/dom.js'
import * as actions from '../../redux/actions'
import {defaulteStyle} from '../../constants.js'
import {parse} from '../../core/parse.js'

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
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)

    this.$emit('table: select', $cell) // $cell.text()

    this.$on('formula: input', value => {
      this.selection.current.attr('data-value', value).text(parse(value))
      // this.selection.current.text(value)
      this.updateTextInStore(value)
    })
    this.$on('formula: done', isEnter => {
      if (isEnter) {
        this.selection.current.focus()
      }
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        })
      )
    })
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.warn(error)
    }
  }

  /**
   *
   * @param {MouseEvent} event
   */
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
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
      this.$emit('table: select', $target) // text()
      const styles = $target.getStyle(Object.keys(defaulteStyle))
      this.$dispatch(actions.changeStyle(styles))
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
      this.$emit('table: select', $next) // text()
    }
  }

  /**
   *
   * @param {InputEvent} event
   */

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    )
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
