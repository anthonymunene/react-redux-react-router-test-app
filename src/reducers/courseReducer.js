/* Keeping all the action types for a reducer gathered in one place at the top of the file can also help you:
    - Keep names consistent
    - Quickly understand the reducer API
    - See what’s changed in pull requests
*/
import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function courseReducer (state = initialState.courses, action) {
  switch (action.type) {
    case types.FETCH_COURSES:
      return { ...state, isFetching: true }
    case types.LOAD_COURSES_SUCCESS:
      return { ...state, items: action.courses, isFetching: false }
    case types.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ]
    case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ]
    default:
      return state
  }
}
