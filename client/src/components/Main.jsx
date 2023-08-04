import React, { useEffect, useRef, useState } from 'react'
import { ChangeName } from './ChangeName';
import { Create } from './Create';
import { Join } from './Join';

export const Main = () => {

  const [changeName, setChangeName] = useState(false); // state que controla si se muestra o no el componente de cambiar el nombre
  const [name, setName] = useState(''); // nombre actual del usuairo

  const pressedChangeName = () => {
    setChangeName(true);
  }

  // Se ejecuta la primera vez que se carga el componente Main
  // Obtiene el nombre del sessionStorage, si lo hay
  // Si hay nombre, se introduce en la variable name
  // si no no se hace nada
  useEffect(() => {
    const loadedName = sessionStorage.getItem('name');
    if (loadedName) setName(loadedName);
  }, []);

  return (
    <>
      <h1>Bienvenido a Rummy Online!!</h1>
      <div id='name'>
        <span>Nombre: <strong>{name}</strong></span>
        <br />
        {
          (name && !changeName) ?
          <button 
            onClick={pressedChangeName}
          >
              Cambiar
          </button>
          :
          changeName &&
          <ChangeName
            name={name}
            setName={setName} 
            setChangeName={setChangeName}
          />
        }
      </div>
      {
        name.length ?
        <div>
          <Create />
          &nbsp;
          <Join />
        </div>
        :
        <ChangeName 
          setName={setName} 
        />
      }
    </>
  )
}
