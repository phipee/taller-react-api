import React, { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import Stats from './components/Stats.jsx'
import CharacterList from './components/CharacterList.jsx'
import Sidebar from './components/Sidebar.jsx'
import './App.css'

export default function App() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

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

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const filteredCharacters = characters.filter((character) => {
    const characterName = character.name ? character.name.toLowerCase() : ''
    return characterName.includes(normalizedSearchTerm)
  })

  return (
    <div style={{fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', background: '#f3f4f6', color: '#0f172a'}}>
      <Header />

      <div style={{padding: '18px 20px', maxWidth: 1200, margin: '0 auto'}}>
        <Stats />

        <div style={{marginTop: 16}}>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar personaje por nombre"
            style={{width: '100%', maxWidth: 360, padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8}}
          />
        </div>

        {loading ? (
          <div style={{padding: 18, textAlign: 'center', color: '#0f172a'}}>Cargando personajes de la API...</div>
        ) : error ? (
          <div style={{padding: 18, textAlign: 'center', color: '#b91c1c'}}>Error al cargar personajes: {error}</div>
        ) : null}

        <div style={{display: 'flex', gap: 24, marginTop: 24, alignItems: 'flex-start'}}>
          <div style={{flex: 1}}>
            <CharacterList characters={filteredCharacters} />
          </div>
          <div style={{width: 280, flexShrink: 0}}>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
