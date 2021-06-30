import {ExcelComponents} from '../../core/ExcelComponent.js'
import {changeTitle} from '../../redux/actions.js'
import {defaultTitle} from '../../constants'
import {$} from '../../core/dom.js'
import {ActiveRoute} from '../../core/routes/ActiveRoute.js'

export class Header extends ExcelComponents {
  static className = 'exel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  toHtml() {
    const title = this.store.getState().title || defaultTitle
    return `
		<input type="text" class="input" value="${title}">
				<div>
					<div class="button">
						<span class="material-icons" data-button="remove">
							delete
						</span>
					</div>
					<div class="button">
						<span class="material-icons" data-button="exit">
							exit_to_app
						</span>
					</div>
				</div>
				`
  }

  onInput(event) {
    this.$dispatch(changeTitle(event.target.value))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const descision = confirm('Вы действительно хотите удалить эту таблицу?')
      if (descision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
