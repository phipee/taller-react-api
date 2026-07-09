import React, { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Stats from './components/Stats.jsx'
import CharacterList from './components/CharacterList.jsx'
import Sidebar from './components/Sidebar.jsx'
import useLocalStorage from './hooks/useLocalStorage.js'
import './App.css'

const FAVORITES_STORAGE_KEY = 'rickandmorty-favorites'
const BLOCKED_STORAGE_KEY = 'rickandmorty-blocked'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [favoriteIds, setFavoriteIds] = useLocalStorage(FAVORITES_STORAGE_KEY, [])
  const [blockedIds, setBlockedIds] = useLocalStorage(BLOCKED_STORAGE_KEY, [])

  useEffect(() => {
    let isMounted = true
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://rickandmortyapi.com/api/character')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (isMounted) setCharacters(Array.isArray(data.results) ? data.results : [])
      } catch (err) {
        if (isMounted) setError(err.message || 'Error desconocido')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchCharacters()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (favoriteIds.length === 0 && blockedIds.length === 0) {
      return
    }

    setFavoriteIds((currentFavorites) => currentFavorites.filter((id) => !blockedIds.includes(id)))
  }, [blockedIds, setFavoriteIds, favoriteIds])

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const filteredCharacters = characters.filter((character) => {
    const characterName = character.name ? character.name.toLowerCase() : ''
    return characterName.includes(normalizedSearchTerm)
  }).filter((character) => !blockedIds.includes(character.id))

  const blockedCharacters = characters.filter((character) => blockedIds.includes(character.id))
  const favoriteCharacters = characters.filter((character) => favoriteIds.includes(character.id))

  const toggleFavorite = (character) => {
    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(character.id)) {
        return currentFavorites.filter((id) => id !== character.id)
      }

      return [...currentFavorites, character.id]
    })
  }

  const toggleBlocked = (character) => {
    setBlockedIds((currentBlocked) => {
      const isCurrentlyBlocked = currentBlocked.includes(character.id)

      if (isCurrentlyBlocked) {
        return currentBlocked.filter((id) => id !== character.id)
      }

      return [...currentBlocked, character.id]
    })

    setFavoriteIds((currentFavorites) => currentFavorites.filter((id) => id !== character.id))
  }

  return (
    <div className="app-shell">
      <Header />

      <div className="app-content">
        <Stats
          totalCharacters={characters.length}
          favoriteCount={favoriteCharacters.length}
          blockedCount={blockedCharacters.length}
        />

        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar personaje por nombre"
            className="search-input"
          />
        </div>

        {loading ? (
          <div style={{padding: 18, textAlign: 'center', color: '#0f172a'}}>Cargando personajes de la API...</div>
        ) : error ? (
          <div style={{padding: 18, textAlign: 'center', color: '#b91c1c'}}>Error al cargar personajes: {error}</div>
        ) : null}

        <div className="layout-columns">
          <div className="main-column">
            <CharacterList
              characters={filteredCharacters}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
              onToggleBlocked={toggleBlocked}
            />
          </div>
          <div className="sidebar-column">
            <Sidebar
              favorites={favoriteCharacters}
              blockedCharacters={blockedCharacters}
              onToggleFavorite={toggleFavorite}
              onToggleBlocked={toggleBlocked}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
