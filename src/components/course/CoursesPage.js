// @flow

import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import * as courseActions from '../../actions/courseActions'
import { bindActionCreators } from 'redux'
import CourseList from './CourseList'
import { browserHistory } from 'react-router'

class CoursesPage extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this)
  }
  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.courses !== this.props.courses
  }

  componentDidMount () {
    // only fetch courses if store hasn't already been populated
    if (!this.props.courses.length) {
      this.props.actions.fetchCourses()
    }
  }

  redirectToAddCoursePage () {
    browserHistory.push('/course')
  }
  render () {
    const { courses, isFetching } = this.props
    return (
      <div style={{opacity: isFetching ? 0.5 : 1}}>
        <h1>Courses</h1>
        <input
          type='submit'
          value='Add Course'
          className='btn btn-primary'
          onClick={this.redirectToAddCoursePage}
        />
        <CourseList courses={courses} />
      </div>
    )
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}
function mapStateToProps (state, ownProps) {
  return {
    courses: state.courses.items,
    isFetching: state.courses.isFetching
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
