import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useMediaQuery } from 'react-responsive'

export default function MyMap() {
  // const isMobile = useMediaQuery({ query: '(max-width: 500px)' })
  const isLaptop = useMediaQuery({ query: '(max-width: 1000px)' })
  console.log('isLaptop >> ', isLaptop)
  if (typeof window !== 'undefined') {
    const position = [53.90100435, 27.516731049346248]
    return (
      <MapContainer
        style={
          isLaptop
            ? { height: '50vh', width: '100%' }
            : { height: '60vh', width: '60vw' }
        }
        center={position}
        zoom={15}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <b>Мы находимся здесь</b>
          </Popup>
        </Marker>
      </MapContainer>
    )
  }
  return null
}
