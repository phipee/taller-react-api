import React from 'react'
import Header from './components/Header.jsx'
import Stats from './components/Stats.jsx'
import CharacterList from './components/CharacterList.jsx'
import Sidebar from './components/Sidebar.jsx'
import './App.css'

export default function App() {
  return (
    <div style={{fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', background: '#f3f4f6', color: '#0f172a'}}>
      <Header />

      <div style={{padding: '18px 20px', maxWidth: 1200, margin: '0 auto'}}>
        <Stats />

        <div style={{display: 'flex', gap: 24, marginTop: 24, alignItems: 'flex-start'}}>
          <div style={{flex: 1}}>
            <CharacterList />
          </div>
          <div style={{width: 280, flexShrink: 0}}>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
