import {ExcelComponents} from '../../core/ExcelComponent.js'

export class Formula extends ExcelComponents {
  static className = 'exel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    })
  }

  toHtml() {
    return `
		<div class="info">fx</div>
				<div class="input" contenteditable spellcheck="false"></div>
		`
  }

  onInput(event) {
    console.log(this.$root)
    console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick() {
    console.log('mk')
  }
}
