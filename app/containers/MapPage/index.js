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
// import { FormattedMessage } from 'react-intl'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
// import { Layout } from 'antd'
import { push } from 'react-router-redux'
import {
  complement,
  compose as RCompose,
  equals,
  path,
  when
} from 'ramda'

import injectSaga from 'utils/injectSaga'
import injectReducer from 'utils/injectReducer'

import Container from 'components/Container'
import SearchLocation from 'components/SearchLocation'

import reducer from './reducer'
import saga from './saga'
// import messages from './messages'
import GoogleMap from './GoogleMap'

import {
  getPlaceAction
} from './actions'
import {
  selectPlace,
  selectPlaceLoading
} from './selectors'
import {
  MAP_KEY,
  MAP_PHOTO_URL
} from './constants'

const MapContainer = styled(Container)`
  position: relative;
  height: 100%;
`
export class MapPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    placeId: '',
    search: '',
    flatType: '',
    lat: 0,
    lng: 0,
    images: []
  }

  _handleSearchUpdate = ({ flatType, location: { value, description } }) => {
    this.props.changeRoute(`/map-page?place_id=${value}&flatType=${flatType}&q=${encodeURIComponent(description)}`)
  }

  _handleRequestPlace = (props) => {
    const { location: { search }, getPlace } = props
    const { place_id: placeId, q, flatType } = queryString.parse(search)

    this.setState({
      search: q,
      placeId,
      flatType
    })

    getPlace({ placeId })
  }

  _updateStatePlace = (place) => {
    const lat = place.getIn(['result', 'geometry', 'location', 'lat'])
    const lng = place.getIn(['result', 'geometry', 'location', 'lng'])
    const photoReferences = place.getIn(['result', 'photos']) || []
    const images = photoReferences.map((photo) =>
      `${MAP_PHOTO_URL}=${photo.get('photo_reference')}&key=${MAP_KEY}`
    )

    this.setState({
      images: images.size ? images.toArray() : images,
      lat,
      lng
    })
  }

  componentDidMount () {
    this._handleRequestPlace(this.props)
  }

  componentWillReceiveProps (nextProps) {
    const { location: { search } } = this.props

    const shouldUpdatePlaceState = when(
      (place) => this.props.place !== place, // also if state is empty we try to populate it with the current store data
      this._updateStatePlace
    )

    const shouldUpdateMapDetails = when(
      RCompose(
        complement(equals(search)),
        path(['location', 'search'])
      ),
      this._handleRequestPlace
    )

    shouldUpdateMapDetails(nextProps)
    shouldUpdatePlaceState(nextProps.place)
  }

  render () {
    const { lat, lng, images, flatType, search, placeId } = this.state
    const propMap = {
      lat,
      lng,
      images
    }
    return (
      <MapContainer>
        <Helmet>
          <title>MapPage</title>
          <meta name='description' content='Description of MapPage' />
        </Helmet>
        {
          (flatType && search) &&
          <SearchLocation
            onSearch={this._handleSearchUpdate}
            placeId={placeId}
            search={search}
            type={flatType}
          />
        }
        {(lat && lng) &&
        <GoogleMap
          {...propMap}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${MAP_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `80vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          center={{lat, lng}}
        />}
      </MapContainer>
    )
  }
}

MapPage.propTypes = {
  place: PropTypes.object.isRequired,
  placeLoading: PropTypes.bool.isRequired,
  getPlace: PropTypes.func.isRequired,
  changeRoute: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  place: selectPlace(),
  placeLoading: selectPlaceLoading()
})

function mapDispatchToProps (dispatch) {
  return {
    getPlace: (payload) => dispatch(getPlaceAction(payload)),
    changeRoute: (url) => dispatch(push(url)),
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
