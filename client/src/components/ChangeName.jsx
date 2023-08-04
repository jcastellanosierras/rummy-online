import React, { useRef } from 'react'

export const ChangeName = ({ name, setName, setChangeName }) => {

  const nameInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newName = nameInput.current.value;

    // Refresh the name whith the input name value
    setName(newName);

    // Save the name in the localStorage
    sessionStorage.setItem('name', newName);

    // Put changeName to false
    if (name) setChangeName(false);

    // Clear input name
    nameInput.current.value = '';
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input id='username' type="text" name='name' placeholder='Introduce tu nombre' ref={nameInput}/>
      <input type="submit" value="Aceptar" />
    </form>
  )
}
