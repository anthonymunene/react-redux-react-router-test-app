/* Keeping all the action types for a reducer gathered in one place at the top of the file can also help you:
 - Keep names consistent
 - Quickly understand the reducer API
 - See what’s changed in pull requests
 */
import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function authorReducer (state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors
    default:
      return state
  }
}
