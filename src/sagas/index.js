import { delay } from 'redux-saga'
import { put, take, takeEvery, call, fork, select } from 'redux-saga/effects'
import { getAll, get, create } from 'firebase-saga';
import { coursesApi } from '../api/mockCourseApi'
import { authorsApi } from '../api/mockAuthorApi'
import * as courseActions from '../actions/courseActions'
import * as authorActions from '../actions/authorActions'
import { getCourses } from '../selectors/selectors'

const actions = {...courseActions, ...authorActions}

console.log(actions)

export function * getAllCoursesApi () {
  return yield call(getAll, 'courses')
}
export function getAllAuthorsApi () {
  return Object.assign([], authorsApi)
}
export function * fetchCourses () {
  const getCoursesFromState = yield select(getCourses)
  if (!getCoursesFromState.items.length) {
    const courses = yield call(getAll, 'courses')
    yield put(actions.loadCoursesSuccess(courses))
  }
}


// export function * fetchCourses () {
//
//   // check current state and prevent api call
//   const getCoursesFromState = yield select(getCourses)
//   if (!getCoursesFromState.items.length) {
//     const courses = yield select(getAll, 'courses')
//     console.log(courses)
//     yield put(actions.loadCoursesSuccess(courses))
//   }
// }


export function * fetchAuthors () {
  yield call(delay, 1000)
  const authors = yield getAllAuthorsApi()
  console.log(authors)
  yield put(actions.loadAuthorsSuccess(authors))
}

function * watchFetchCourses () {
  yield takeEvery('FETCH_COURSES', fetchCourses)
}
function * watchFetchAuthors() {
  yield takeEvery('FETCH_AUTHORS', fetchAuthors)
}
export default function* rootSaga() {
  yield [
    fork(watchFetchCourses),
    fork(watchFetchAuthors)
  ]
}