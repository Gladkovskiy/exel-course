import {$} from '../../core/dom.js'
// класс для рендеринга компонентов на странице
export class Excel {
  // selector - точка входа, options - объект с массивом компонентов
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'exel')

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHtml())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(component => {
      component.init()
    })
  }
}
