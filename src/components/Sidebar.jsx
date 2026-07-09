import React from 'react'

export default function Sidebar({ favorites = [], blockedCharacters = [], onToggleFavorite, onToggleBlocked }) {
  return (
    <aside className="sidebar-anim panel-card sidebar-panel">
      <h3 style={{margin: 0, fontSize: 16}}>Mis Favoritos</h3>

      {favorites.length === 0 ? (
        <p className="muted-text">No has seleccionado favoritos aún.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((character) => (
            <div key={character.id} className="favorite-item">
              <img src={character.image} alt={character.name} className="favorite-avatar" />
              <div className="favorite-meta">
                <span className="favorite-name">{character.name}</span>
                <button type="button" className="favorite-link" onClick={() => onToggleFavorite?.(character)}>
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="sidebar-divider" />

      <h3 style={{margin: 0, fontSize: 16}}>Bloqueados</h3>

      {blockedCharacters.length === 0 ? (
        <p className="muted-text">No has bloqueado personajes aún.</p>
      ) : (
        <div className="favorites-list">
          {blockedCharacters.map((character) => (
            <div key={character.id} className="favorite-item">
              <img src={character.image} alt={character.name} className="favorite-avatar" />
              <div className="favorite-meta">
                <span className="favorite-name">{character.name}</span>
                <button type="button" className="favorite-link" onClick={() => onToggleBlocked?.(character)}>
                  Desbloquear
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}
