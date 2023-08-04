import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { generateCode } from '../utils/generateCode';
import { io } from 'socket.io-client';
import { sha256 } from 'crypto-hash';

export const Create = () => {

  const [formActive, setFormActive] = useState(false);
  const navigate = useNavigate();

  const openForm = () => setFormActive(true);

  const handleCreateRoom = async (e) => {
    e.preventDefault();

    // Generate a random code to the room
    let code = generateCode();
    console.log(code);

    // Create the socket
    const socket = io('http://127.0.0.1:3000');

    // Obtain the password
    let pass = e.target.roompass.value;
    // Do the hash
    pass = await sha256(pass);

    // Send message to server with the code and password
    // Pass the roomcode and roompass
    socket.emit('create-room', {
      host: sessionStorage.getItem('name'),
      code,
      pass 
    });

    setFormActive(false);

    // When the room was created
    // Disconnect de socket
    // And go to play page
    socket.on('room-created', () => {
      socket.disconnect();
      navigate('/play/' + code);
    });
  }

  const formCancel = () => setFormActive(false);

  return (
    <>
      <button onClick={openForm}>Crear Sala</button>
      {
        formActive &&
        <form onSubmit={handleCreateRoom}>
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
