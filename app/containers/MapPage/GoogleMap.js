import React from 'react'
import PropTypes from 'prop-types'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

export class MapComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
  }
  render () {
    const { lat, lng } = this.props
    return (
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat, lng }}
      >
        <Marker position={{ lat, lng }} />
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MapComponent))
