import {ExcelComponents} from '../../core/ExcelComponent.js'

export class Toolbar extends ExcelComponents {
  static className = 'exel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    })
  }

  toHtml() {
    return `
		<div class="button">
					<span class="material-icons">
						format_align_left
					</span>
				</div>
				<div class="button">
					<span class="material-icons">
						format_align_center
					</span>
				</div>
				<div class="button">
					<span class="material-icons">
						format_align_right
					</span>
				</div>
				<div class="button">
					<span class="material-icons">
						format_bold
					</span>
				</div>
				<div class="button">
					<span class="material-icons">
						format_italic
					</span>
				</div>
				<div class="button">
					<span class="material-icons">
						format_underline
					</span>
				</div>
		`
  }

  onClick(event) {
    console.log(event.target)
  }
}
