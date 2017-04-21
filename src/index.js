// /*eslint-disable import/default */
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import configureStore from './store/configureStore'
import {Provider} from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import {fetchCourses} from './actions/courseActions'
import {loadAuthors} from './actions/authorActions'
import './styles/styles.css' // Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/toastr/build/toastr.min.css'
import rootSaga from './sagas'
import firebase from 'firebase'
import { config } from './config'


const store = configureStore()
store.runSaga(rootSaga)
window.firebase = firebase
window.firebase.initializeApp(config.firebase)



render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
