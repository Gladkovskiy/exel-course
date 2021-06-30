export function creatStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    // подписаться на событие со своей функцией
    subscribe(fn) {
      listeners.push(fn)
      return {
        // отписаться от события (убираем функцию из массива)
        unsubscribe() {
          listeners = listeners.filter(listener => listener !== fn)
        },
      }
    },

    // создать событие
    dispatch(action) {
      // rootReducer - функция которая по action меняет state
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },

    getState() {
      return JSON.parse(JSON.stringify(state))
    },
  }
}

// Extra task = переписать на класс
