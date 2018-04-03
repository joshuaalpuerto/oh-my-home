/**
 *
 * HomePage
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'
import makeSelectHomePage from './selectors'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <Helmet>
          <title>HomePage</title>
          <meta name='description' content='Description of HomePage' />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    )
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomePage()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'homePage', reducer })
const withSaga = injectSaga({ key: 'homePage', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(HomePage)
