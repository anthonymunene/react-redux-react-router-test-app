// This component handles the App template used on every page.
import React, {PropTypes} from 'react'
import Header from './common/Header'
import Loader from './common/Loader'
import {connect} from 'react-redux'

class App extends React.Component {
  render () {
    return (
      <div className='container-fluid'>
        <Header />
        {this.props.isFetching ? <Loader /> : null}
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
}

export default connect()(App)
