// подключение стилей
import './sass/index.sass'
// импортируем класс Excel
import {Excel} from './components/excel/Excel.js'
// импортируем класс Header и т.д.
import {Header} from './components/header/Header.js'
import {Toolbar} from './components/toolbar/Toolbar.js'
import {Formula} from './components/formula/Formula.js'
import {Table} from './components/table/Table.js'
import {creatStore} from './core/createStore'
import {rootReducer} from './redux/rootReducer'
import {storage, debounce} from './core/utils'
import {initialState} from './redux/initialState'

const store = creatStore(rootReducer, initialState)

const stateListener = debounce(state => {
  storage('Excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
