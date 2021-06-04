import {capitalize} from './utils'

export class DomListener {
  // корневой элемент на который будем вешать слушатели
  // $root должны передовать из ExelComponents
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No root provided for DomListener')
    }

    this.$root = $root
    this.listeners = listeners
  }

  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMathodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} is not implement in ${name}`)
      }
      this[method] = this[method].bind(this)
      // тоже самое что и addEventListener
      this.$root.on(listener, this[method])
    })
  }

  removeDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMathodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMathodName(iventName) {
  return `on${capitalize(iventName)}`
}
