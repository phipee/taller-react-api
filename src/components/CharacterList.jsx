import React from 'react'

export default function CharacterList({ characters = [], favoriteIds = [], onToggleFavorite, onToggleBlocked }) {
  return (
    <section className="character-list-anim panel-card">
      <h2 style={{margin: 0, fontSize: 20}}>Listado de Personajes</h2>

      {(!characters || characters.length === 0) ? (
        <p className="muted-text">No hay personajes para mostrar con ese filtro.</p>
      ) : (
        <div className="characters-grid">
          {characters.map(item => (
            <article key={item.id} className={`character-card ${favoriteIds.includes(item.id) ? 'is-favorite' : ''}`}>
              <div className="character-image-wrap">
                <img src={item.image} alt={item.name} className="character-image" />
              </div>
              <div className="character-card-body">
                <div className="character-name">{item.name}</div>
                <div className="character-actions">
                  <button type="button" className="favorite-button" onClick={() => onToggleFavorite?.(item)}>
                    {favoriteIds.includes(item.id) ? 'Quitar de favoritos' : 'Marcar favorito'}
                  </button>
                  <button type="button" className="block-button" onClick={() => onToggleBlocked?.(item)}>
                    Bloquear
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
