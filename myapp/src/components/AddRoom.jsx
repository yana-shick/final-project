import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Add from './img/add.svg';

export default function AddRoom(props) {

  const [roomTypeInp, setRoomTypeInp] = useState('');
  const [roomNameInp, setRoomNameInp] = useState('');
  const [roomColorInp, setRoomColorInp] = useState('');

  const nav = useNavigate();

  const validateAdd = () => { // validate inputs and go to home ('/') page
    if (roomTypeInp != '' && roomNameInp.length >= 1) {
      props.addRoomFunc(roomTypeInp, roomNameInp, roomColorInp);
      nav('/')
    } else {
      alert('error');
      nav('/')
    }
  }


  return (
    <div className='add-room-page'>

      <div className='add-room-menu'>
        <select className='add-room-bar add-room-select' onChange={(e) => { setRoomTypeInp(e.target.value) }}>
          <option hidden value=''>choose a type</option>
          {props.roomTypeList.map((roomType) => {
            return <option>{roomType}</option>
          })}
        </select><br />
        <input className='add-room-bar' onChange={(e) => { setRoomNameInp(e.target.value) }} maxLength="5" type="text" placeholder='give a name to you room' /><br />
        <input className='add-room-bar' onChange={(e) => { setRoomColorInp(e.target.value) }} type="text" placeholder='give a color to your room' /><br />
      </div>

      <img src={Add} onClick={validateAdd} alt="AddIcon" />

    </div>
  )
}

