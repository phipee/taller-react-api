import React from 'react'

function Stat({label, value}) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  )
}

export default function Stats({ totalCharacters = 0, favoriteCount = 0, blockedCount = 0 }) {
  return (
    <div className="stats-grid header-anim">
      <Stat label="Totales" value={totalCharacters} />
      <Stat label="Favoritos" value={favoriteCount} />
      <Stat label="Bloqueados" value={blockedCount} />
    </div>
  )
}
