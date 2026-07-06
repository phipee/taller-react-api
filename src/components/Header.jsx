import React from 'react'

export default function Header() {
  return (
    <header className="header-anim" style={{background: '#0ea5e9', color: '#fff', padding: '20px 16px', textAlign: 'center'}}>
      <h1 style={{margin: 0, fontSize: '28px', fontWeight: 700}} className="title-pulse">Rick & Morty Hub</h1>
      <div style={{marginTop: '8px', fontSize: '14px'}}>
        Integrantes: [Aquí van nuestros nombres]
      </div>
    </header>
  )
}
