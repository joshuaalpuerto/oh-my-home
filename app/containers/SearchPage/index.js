/**
 *
 * SearchPage
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
import makeSelectSearchPage from './selectors'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

export class SearchPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <Helmet>
          <title>SearchPage</title>
          <meta name='description' content='Description of SearchPage' />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    )
  }
}

SearchPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  searchpage: makeSelectSearchPage()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'searchPage', reducer })
const withSaga = injectSaga({ key: 'searchPage', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(SearchPage)
