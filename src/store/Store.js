import { createStore } from 'redux'
import GridReducer from '../reducers/GridReducer'

const Store = createStore(GridReducer)

export default Store