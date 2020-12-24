import React, { useRef, useState, useEffect } from 'react'
import classNames from 'classnames'

import './styles.css'

const Station = ({ data, setPlayingId, playingId }) => {
  const { id, imgUrl, name, description, streamUrl, tags } = data

  const audioEl = useRef(null)

  const [audioError, setAudioError] = useState('')
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (playingId && playingId !== id) {
      audioEl.current.pause()
      setPlaying(false)
    }
  }, [playingId, id])

  const onAudioPlay = () => {
    const audio = audioEl.current

    if (audio.paused) {
      if (!audio.error) {
        audio.play()
      }
      setPlaying(true)
      setPlayingId(id)
    } else {
      audio.pause()
      setPlaying(false)
      setPlayingId('')
    }

    if (audio.error) {
      setAudioError('Station is not available')
    }
  }

  return (
    <div
      className={classNames({
        'station': true,
        'station--active': playing,
        'station--error': audioError && playing
      })}
    >
      <div className="station__cover">
        <div className="station__cover-ratio">
          <img src={imgUrl} className="station__image" alt={name}/>
          <button
            type="button"
            onClick={onAudioPlay}
            className="station__play"
            area-label={playing ? 'Pause' : 'Play'}
          >
            <div
              className={classNames({
                'station__play-button': true,
                'station__play-button--active': playing,
              })}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" fill="currentColor">
                {playing
                  ? <path d="M112 0H16C7.168 0 0 7.168 0 16v288c0 8.832 7.168 16 16 16h96c8.832 0 16-7.168 16-16V16c0-8.832-7.168-16-16-16zM304 0h-96c-8.832 0-16 7.168-16 16v288c0 8.832 7.168 16 16 16h96c8.832 0 16-7.168 16-16V16c0-8.832-7.168-16-16-16z" />
                  : <path d="M295.84 146.049l-256-144a16.026 16.026 0 00-15.904.128A15.986 15.986 0 0016 16.001v288a15.986 15.986 0 007.936 13.824A16.144 16.144 0 0032 320.001c2.688 0 5.408-.672 7.84-2.048l256-144c5.024-2.848 8.16-8.16 8.16-13.952s-3.136-11.104-8.16-13.952z" />
                }
              </svg>
            </div>
          </button>
          <audio src={streamUrl} ref={audioEl} className="" />
        </div>
      </div>

      <div
        className={classNames({
          'station__details': true,
          'station__details--active': playing
        })}
      >
        {audioError && <div className="station__error">{audioError}</div>}

        <h3 className="station__title">{name}</h3>
        <div className="station__description">{description}</div>

        <ul className="station__tags">
          {tags.map((tag, i) => (
            <li key={i} className="station__tag">{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Station