import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import GridReducer from '../reducers/GridReducer'

/* For Redux dev tools see... */
/* https://github.com/zalmoxisus/redux-devtools-extension#usage */
const composeEnhancers = composeWithDevTools({});

const Store = createStore(
    GridReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

export default Store