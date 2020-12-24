import React, { useEffect, useState } from 'react'

import Button from '../button'

import Station from './station'
import './styles.css'

const Stations = () => {
  const API_URL = 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json'
  const ASC = 'ascending'
  const DESC = 'descending'
  const KEY_RELIABILITY = 'reliability'
  const KEY_POPULARITY = 'popularity'

  const [data, setData] = useState([])
  const [sortKey, setSortKey] = useState('')
  const [sortDirection, setSortDirection] = useState('')
  const [playingId, setPlayingId] = useState('')

  useEffect(() => fetchStations(), [])

  const fetchStations = async () => {
    const response = await fetch(API_URL)
    const data = await response.json()
    setData(data.data)
  }

  const sortBy = key => {
    let sorted = []
    if (sortDirection === DESC && sortKey === key) {
      setSortDirection(ASC)
      sorted = [...data].sort((a, b) => a[key] - b[key])
    } else {
      setSortDirection(DESC)
      sorted = [...data].sort((a, b) => b[key] - a[key])
    }
    setSortKey(key)
    setData(sorted)
  }

  const renderArrow = key => {
    if (sortKey === key) {
      return sortDirection === DESC ? '▼' : '▲'
    }

    return
  }

  return (
    <div>
      <header className="header">
        <div>
          <h2 className="sort-title">Sort by:</h2>

          <div className="buttons-group">
            <Button onClick={() => sortBy(KEY_RELIABILITY)}>
              Reliability {renderArrow(KEY_RELIABILITY)}
            </Button>
            <Button onClick={() => sortBy(KEY_POPULARITY)}>
              Popularity {renderArrow(KEY_POPULARITY)}
            </Button>
          </div>
        </div>
      </header>

      <main className="stations">
        {data.map(station => (
          <Station
            key={station.id}
            data={station}
            setPlayingId={setPlayingId}
            playingId={playingId}
          />
        ))}
      </main>
    </div>
  )
}

export default Stations
