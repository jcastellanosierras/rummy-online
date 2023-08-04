import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

export const Play = () => {

  const [users, setUsers] = useState([]);
  const {id: code} = useParams();
  const [msg, setMsg] = useState('');
  const [established, setEstablished] = useState(false);

  // Do this only the first time
  useEffect(() => {
    // Check if the conecction is already established
    if (established) return;

    // Establish a socket
    const socket = io('http://localhost:3000');

    // Join to the room
    const name = sessionStorage.getItem('name');
      socket.emit('join-room', ({
        name,
        code
    }));

    // Listen
    // Join confirm
    socket.on('joined', (recv) => {
      setEstablished(true);
      setMsg(recv);
    });

    // Users
    socket.on('users', (recvUsers) => {
      console.log('users received', recvUsers);
      setUsers(recvUsers);
    })

    socket.on('disconnect', () => {
      setEstablished(false);
    });
  }, []);
  
  return (
    <div>
      <ul>
        {
          users.length && users.map((user) => (<li key={users.length+1}>{user}</li>))
        }
        {console.log(users)}
      </ul>
    </div>
  )
}
