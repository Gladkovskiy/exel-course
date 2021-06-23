import {$} from '../../core/dom.js'
import {ExcelComponents} from '../../core/ExcelComponent.js'

export class Formula extends ExcelComponents {
  static className = 'exel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options,
    })
  }

  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$on('table: select', $cell => {
      // text
      this.$formula.text($cell.data.value) // text
    })
  }

  toHtml() {
    return `
		<div class="info">fx</div>
				<div id="formula" class="input" contenteditable spellcheck="false">
        </div>
		`
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
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
