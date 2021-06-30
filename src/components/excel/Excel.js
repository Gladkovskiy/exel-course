import {$} from '../../core/dom.js'
import {Emitter} from '../../core/Emmiter.js'
import {StoreSubscribe} from '../../core/storeSubscriber.js'
import {updateDate} from '../../redux/actions.js'
// класс для рендеринга компонентов на странице
export class Excel {
  // selector - точка входа, options - объект с массивом компонентов
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscribe(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'exel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHtml())
      $root.append($el)
      return component
    })

    return $root
  }

  init() {
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => {
      component.init()
    })
  }

  destroy() {
    this.subscriber.unsubscribeFromeStore()
    this.components.forEach(component => component.destroy())
  }
}
