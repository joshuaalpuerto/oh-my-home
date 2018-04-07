import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import {
  isEmpty
} from 'ramda'

import Img from 'components/Img'

const ImageContainer = styled.div`
  display: flex;
  height: 200px;
  overflow: auto;

  > img {
    flex: 1;
    margin: 10px;
  }
`
export class MapComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
  }

  state = {
    open: false
  }

  _infoToggle = () => {
    const { images } = this.props
    this.setState(({ open }) => ({
      open: (!isEmpty(images) && !open)
    }))
  }

  render () {
    const { open } = this.state
    const { lat, lng, images } = this.props
    return (
      <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat, lng }}
      >
        <Marker
          position={{ lat, lng }}
          onClick={this._infoToggle}
        >
          {
            open &&
            <InfoWindow onCloseClick={this._infoToggle} >
              <ImageContainer>
                {
                images.map((image) => (
                  <Img key={image} src={image} alt={image} />
                ))
              }
              </ImageContainer>
            </InfoWindow>
          }
        </Marker>
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MapComponent))
