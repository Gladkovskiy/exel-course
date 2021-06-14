export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // (вызов) откуда необходимо считать информацию
  // ...arg передаём сколько хотим парметров
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // (вызов)куда надо считать информацию и обработать её в функции
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== fn
      )
    }
  }
}

/* const emitter = new Emitter()

emitter.subscrib('andrey', data => console.log('sub:', data))
emitter.emit('andrey', 42) */
