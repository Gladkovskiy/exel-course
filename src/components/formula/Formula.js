import {$} from '../../core/dom.js'
import {ExcelComponents} from '../../core/ExcelComponent.js'

export class Formula extends ExcelComponents {
  static className = 'exel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    })
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$on('table: select', text => this.$formula.text(text))
    this.$on('table: input', text => this.$formula.text(text))
  }

  toHtml() {
    return `
		<div class="info">fx</div>
				<div id="formula" class="input" contenteditable spellcheck="false">
        </div>
		`
  }
  /**
   *
   * @param {MouseEvent} event
   */
  onInput(event) {
    const text = $(event.target).text()
    this.$emit('formula: input', text)
  }

  /**
   *
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    if (event.key === 'Enter' || event.key === 'Tab') {
      event.preventDefault()
      this.$emit('formula: done', true)
    }
  }
}
