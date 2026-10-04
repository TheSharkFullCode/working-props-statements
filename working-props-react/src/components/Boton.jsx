import React from 'react'

function Boton({texto,AlhacerClick}) {
  return (
    <div>
        <button onClick={AlhacerClick}>{texto}</button>
    </div>
  )
}

export default Boton