import { combineReducers } from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import courses from './courseReducer'
import authors from './authorReducer'


const rootReducer = combineReducers({
  firebase: firebaseStateReducer,
  courses,
  authors
})

export default rootReducer
