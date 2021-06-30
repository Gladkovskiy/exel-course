import {Page} from '../core/Page'
// импортируем класс Excel
import {Excel} from '../components/excel/Excel.js'
// импортируем класс Header и т.д.
import {Header} from '../components/header/Header.js'
import {Toolbar} from '../components/toolbar/Toolbar.js'
import {Formula} from '../components/formula/Formula.js'
import {Table} from '../components/table/Table.js'
import {creatStore} from '../core/createStore'
import {rootReducer} from '../redux/rootReducer'
import {storage, debounce} from '../core/utils'
import {normalizeInitialState} from '../redux/initialState'

function storageName(param) {
  return `excel:${param}`
}

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()
    const state = storage(storageName(params))
    const store = creatStore(rootReducer, normalizeInitialState(state))
    const stateListener = debounce(state => {
      storage(storageName(params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}
