import React from 'react'

export default function Sidebar() {
  return (
    <aside className="sidebar-anim" style={{background: '#fff', padding: 18, borderRadius: 8, boxShadow: '0 1px 3px rgba(2,6,23,0.06)'}}>
      <h3 style={{margin: 0, fontSize: 16}}>Mis Favoritos</h3>
      <p style={{marginTop: 10, color: '#64748b'}}>No has seleccionado favoritos aún</p>
    </aside>
  )
}
