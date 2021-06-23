import {DomListener} from './DomListener.js'

export class ExcelComponents extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribes = []

    this.prepare()
  }

  // настраиваем наш компонент до инит
  prepare() {}

  toHtml() {
    return ''
  }

  // инциализируем компонент
  // добаавляем до слушателей
  init() {
    this.initDomListeners()
  }

  // удаляем компонент
  // чистим слушателя
  destroy() {
    this.removeDomListeners()
    this.unsubscribes.forEach(unsub => unsub())
  }

  // создаём событие
  $emit(event, ...arg) {
    this.emitter.emit(event, ...arg)
  }

  // подписуемся на событие
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Сюда приходят изменения по тем полям на которые мы подписались
  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }
}
