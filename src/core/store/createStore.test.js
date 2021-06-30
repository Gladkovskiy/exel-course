import {creatStore} from './createStore.js'

const initialState = {
  count: 0,
}

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1}
  }
  return state
}

describe('createStore:', () => {
  test('should return store object', () => {
    const store = creatStore(reducer)
    expect(store).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })

  test('should return object as a state', () => {
    const store = creatStore(reducer)
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    const store = creatStore(reducer, initialState)
    expect(store.getState()).toEqual(initialState)
  })

  test('should change state if action exists', () => {
    const store = creatStore(reducer, initialState)
    store.dispatch({type: 'ADD'})
    expect(store.getState().count).toBe(1)
  })

  test('should NOT change state if action dont exists', () => {
    const store = creatStore(reducer, initialState)
    store.dispatch({type: 'NOT_EXISTS_ACTION'})
    expect(store.getState().count).toBe(0)
  })

  test('should call function subscriber', () => {
    const handler = jest.fn()
    const store = creatStore(reducer, initialState)

    store.subscribe(handler)
    store.dispatch({type: 'ADD'})
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  // асинхронное тестирование
  test('Should dispatch in async way', () => {
    const store = creatStore(reducer, initialState)

    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'})
      }, 500)

      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000)
    })
  })
})
