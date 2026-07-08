import React from 'react'

function Stat({label, value}) {
  return (
    <div style={{background: '#fff', padding: '12px 18px', borderRadius: 8, boxShadow: '0 1px 2px rgba(0,0,0,0.06)', minWidth: 120, textAlign: 'center'}}>
      <div style={{fontSize: 13, color: '#64748b'}}>{label}</div>
      <div style={{fontSize: 18, fontWeight: 700, marginTop: 6}}>{value}</div>
    </div>
  )
}

export default function Stats({ totalCharacters = 0, favoriteCount = 0, blockedCount = 0 }) {
  return (
    <div style={{display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, alignItems: 'stretch', animation: 'fadeUp 420ms ease both'}}>
      <div className="stat-item"><Stat label="Totales" value={totalCharacters} /></div>
      <div className="stat-item"><Stat label="Favoritos" value={favoriteCount} /></div>
      <div className="stat-item"><Stat label="Bloqueados" value={blockedCount} /></div>
    </div>
  )
}
