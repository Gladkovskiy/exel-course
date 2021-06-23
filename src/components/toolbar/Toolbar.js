import {defaulteStyle} from '../../constants.js'
import {$} from '../../core/dom.js'
import {ExcelStateComponent} from '../../core/ExcelStateComponent.js'
import {createToolbar} from './toolbar.template.js'

export class Toolbar extends ExcelStateComponent {
  static className = 'exel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }

  prepare() {
    const initialState = defaulteStyle
    this.initState(initialState)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHtml() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)

      this.$emit('toolbar:applyStyle', value)
    }
  }
}
