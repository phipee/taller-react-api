import React from 'react'

export default function CharacterList({ characters = [] }) {
  return (
    <section className="character-list-anim" style={{background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 1px 3px rgba(2,6,23,0.06)'}}>
      <h2 style={{margin: 0, fontSize: 20}}>Listado de Personajes</h2>

      {(!characters || characters.length === 0) ? (
        <p style={{marginTop: 12, color: '#475569'}}>Aquí se cargarán los datos de la API en el próximo commit...</p>
      ) : (
        <div style={{marginTop: 12, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))'}}>
          {characters.map(item => (
            <article key={item.id} style={{background: '#f8fafc', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(2,6,23,0.06)'}}>
              <div style={{width: '100%', height: 160, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0'}}>
                <img src={item.image} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div style={{padding: 10}}>
                <div style={{fontWeight: 700, fontSize: 14, color: '#0f172a'}}>{item.name}</div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
