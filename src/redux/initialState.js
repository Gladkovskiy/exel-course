import {defaulteStyle, defaultTitle} from '../constants'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'text'}
  stylesState: {},
  currentText: '',
  currentStyles: defaulteStyle,
  openDate: new Date().toJSON(),
}

const normalize = state => ({
  ...state,
  currentStyles: defaulteStyle,
  currentText: '',
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}
