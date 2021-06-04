// аля jQuery
class Dom {
  constructor(selector) {
    // если selector строка то ищем по селектору элемент
    // если select это элемент то сразу присваиваем
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  // получить html элемента с содержимым в парметре html
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      // return this возвращает инстанс для того,
      // чтобы методы подрят можно было писать(chain подход)
      return this
    }
    // возвращаем HTML элемента с самим элементом без пробелов с обоих концов
    return this.$el.outerHTML.trim()
  }

  // очищение елемента от внутреннего html
  clear() {
    this.html('')
    return this
  }

  // добавление в конец элемента другого элемента HTML
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    this.$el.append(node)
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
}

// возвращаем интнас долара чтобы не писать каждый раз new
export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
