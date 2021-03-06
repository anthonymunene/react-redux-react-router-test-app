import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as courseActions from '../../actions/courseActions'
import * as authorActions from '../../actions/authorActions'
import CourseForm from './CourseForm'
import toastr from 'toastr'
import { authorsFormattedForDropdown } from '../../selectors/selectors'
export class ManageCoursePage extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      course: Object.assign({}, props.course),
      errors: {},
      saving: false
    }
    this.updateCourseState = this.updateCourseState.bind(this)
    this.saveCourse = this.saveCourse.bind(this)
    this.redirect = this.redirect.bind(this)
    this.courseFormIsValid = this.courseFormIsValid.bind(this)
  }
  componentDidMount () {
    if (!this.props.authors.length) {
      this.props.actions.fetchAuthors()
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps)
    console.log(this.props)
    if (
      nextProps.course !== this.props.course
    ) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)})
    }
  }
  updateCourseState (event) {
    const field = event.target.name
    let course = this.state.course
    course[field] = event.target.value
    return this.setState({course: course})
  }
  redirect () {
    this.setState({saving: false})
    toastr.success('Course saved')
    this.context.router.push('/courses')
  }
  courseFormIsValid () {
    let formIsValid = true
    let errors = {}
    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.'
      formIsValid = false
    }
    this.setState({errors: errors})
    return formIsValid
  }
  saveCourse (event) {
    event.preventDefault()
    if (!this.courseFormIsValid()) {
      return
    }
    this.setState({saving: true})
    this.props.actions.saveCourse(this.state.course)
          .then(() => this.redirect())
          .catch(error => {
            toastr.error(error)
            this.setState({saving: false})
          })
  }

  render () {
    console.count('foo')
    return (
      <CourseForm
        allAuthors={this.props.authors}
        course={this.state.course}
        errors={this.state.errors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        saving={this.state.saving}
          />
    )
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

// Pull in the React router context so that this.context.router is available
ManageCoursePage.contextTypes = {
  router: PropTypes.object
}

function getCourseById (courses, id) {
  const course = courses.filter(course => course.id === id)
  if (course) return course[0]
  return null
}
function mapStateToProps (state, ownProps) {
  const courseId = ownProps.params.id
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' }
  if (courseId && state.courses.items.length > 0) {
    course = getCourseById(state.courses.items, courseId)
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors.items)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({...authorActions, ...courseActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage)
