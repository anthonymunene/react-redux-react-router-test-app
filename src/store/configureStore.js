import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'

// adding redux chrome devtools option
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleWare = process.env.NODE_ENV !== 'production'
  ? [require('redux-immutable-state-invariant')(), thunk]
  : [thunk]
export default function configStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleWare))
  )
}
