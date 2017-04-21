import * as types from '../actions/actionTypes'
import initialState from './initialState'

function actionTypeEndsInSuccess (type) {
  return type.substring(type.length - 8) === '_SUCCESS'
}

export default function ajaxStatusReducer (state = initialState.isFetching, action) {

  if (action.type === types.BEGIN_AJAX_CALL) {
    return { ...state, isFetching: true }
  } else if (action.type === types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return { ...state, isFetching: false }
  }
  return state
}
