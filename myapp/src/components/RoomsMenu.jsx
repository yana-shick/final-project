import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Plus from './img/plus-solid.svg';

export default function RoomsMenu(props) {

  const nav = useNavigate();

  const goToRoom = (room) => {
    nav(room.pathName);
  }

  return (
    <div className="rooms-menu-page">

      <div className="rooms-menu">
        {props.userRoomArr.map((room) => {     // display all rooms that user created
          return <button className='room-button' style={{ backgroundColor: room.color }}
            onClick={() => { goToRoom(room) }}>{room.name.charAt(0)}</button>
        })}
      </div>
      <Link to='/addroom'><img src={Plus} alt="PlusIcon" /></Link>

    </div>
  )
}
