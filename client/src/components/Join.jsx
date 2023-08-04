import React, { useState } from 'react'

export const Join = () => {

  const [formActive, setFormActive] = useState(false);

  const openForm = () => setFormActive(true);

  const formSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.roomcode.value);
    console.log(e.target.roompass.value);

    // Check if exist a room with that code
    // If exist check if the password is correct
    // If it is correct redirect to match
    // Else show an error message

    setFormActive(false);
  }

  const formCancel = () => setFormActive(false);

  return (
    <>
      <button onClick={openForm}>Unirse a una Sala</button>
      {
        formActive &&
        <form onSubmit={formSubmit}>
          <input 
            type="text" 
            name='roomcode' 
            placeholder='Código de la sala'
          />
          <br />
          <input
            type="password"
            name='roompass'
            placeholder='Contraseña de la sala'  
          />
          <br />
          <button type="submit">Aceptar</button>
          <button onClick={formCancel}>Cancelar</button>
        </form>
      }
    </>
  )
}
