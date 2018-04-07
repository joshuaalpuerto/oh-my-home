/**
 *
 * MapPage
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
import makeSelectMapPage from './selectors'
import reducer from './reducer'
import saga from './saga'
import messages from './messages'

export class MapPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <Helmet>
          <title>MapPage</title>
          <meta name='description' content='Description of MapPage' />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    )
  }
}

MapPage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  mappage: makeSelectMapPage()
})

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

const withReducer = injectReducer({ key: 'mapPage', reducer })
const withSaga = injectSaga({ key: 'mapPage', saga })

export default compose(
  withReducer,
  withSaga,
  withConnect
)(MapPage)
