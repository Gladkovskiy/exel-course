import {ExcelComponents} from '../../core/ExcelComponent.js'

export class Header extends ExcelComponents {
  static className = 'exel__header'

  toHtml() {
    return `
		<input type="text" class="input" value="Новая таблица">
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
}
