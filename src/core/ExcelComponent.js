import {DomListener} from './DomListener.js'

export class ExcelComponents extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
  }

  // возвращает шаблон компонента
  toHtml() {
    return ''
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
  }
}