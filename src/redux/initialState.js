import {defaulteStyle, defaultTitle} from '../constants'
import {storage} from '../core/utils'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {}, // {'0:1': 'text'}
  stylesState: {},
  currentText: '',
  currentStyles: defaulteStyle,
}

const normalize = state => ({
  ...state,
  currentStyles: defaulteStyle,
  currentText: '',
})

export const initialState = storage('Excel-state')
  ? normalize(storage('Excel-state'))
  : defaultState
