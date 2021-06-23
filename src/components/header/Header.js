import {ExcelComponents} from '../../core/ExcelComponent.js'
import {changeTitle} from '../../redux/actions.js'
import {defaultTitle} from '../../constants'

export class Header extends ExcelComponents {
  static className = 'exel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  toHtml() {
    const title = this.store.getState().title || defaultTitle
    return `
		<input type="text" class="input" value="${title}">
				<div>
					<div class="button">
						<span class="material-icons">
							delete
						</span>
					</div>
					<div class="button ">
						<span class="material-icons">
							exit_to_app
						</span>
					</div>
				</div>
				`
  }

  onInput(event) {
    this.$dispatch(changeTitle(event.target.value))
  }
}
