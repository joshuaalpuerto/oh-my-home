/**
 *
 * MapPage
 *
 */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { Layout } from 'antd';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import Container from 'components/Container'
import SearchLocation from 'components/SearchLocation'

import reducer from './reducer'
import saga from './saga'
import messages from './messages'

import {
  getPlaceAction
} from './actions'
import {
  selectPlace,
  selectPlaceLoading
} from './selectors'
import {
  MAP_KEY
} from './constants'

const { Sider, Content } = Layout;

const MapContainer = styled(Container)`
  position: relative;
  height: 100%;
`

const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
))

export class MapPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = {
    search: '',
    flatType: ''
  }

  _handleSearchUpdate = ({ flatType, location: { value, description } }) => {
    this.props.changeRoute(`/map-page?place_id=${value}&flatType=${flatType}&q=${encodeURIComponent(description)}`)
  }

  _handleRequestPlace = (props) => {
    const { location: { search }, getPlace } = props
    const { place_id: placeId, q, flatType } = queryString.parse(search)

    this.setState({
      search: q,
      flatType
    })

    getPlace({ placeId })
  }

  componentDidMount() {
    this._handleRequestPlace(this.props)
  }

  render () {
    return (
      <MapContainer>
        <Helmet>
          <title>MapPage</title>
          <meta name='description' content='Description of MapPage' />
        </Helmet>
        <SearchLocation
          onSearch={this._handleSearchUpdate}
        />
        <MapComponent
          isMarkerShown
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `80vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </MapContainer>
    )
  }
}

MapPage.propTypes = {
  place: PropTypes.object.isRequired,
  placeLoading: PropTypes.bool.isRequired,
  getPlace: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  place: selectPlace(),
  placeLoading: selectPlaceLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    getPlace: (payload) => dispatch(getPlaceAction(payload)),
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
