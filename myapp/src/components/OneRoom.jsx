import React from 'react'
import DeviseInRoom from './DeviseInRoom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../context';


import Plus from './img/plus-solid.svg';
import Add from './img/add.svg';

export default function OneRoom(props) {
  //use context - all my values and functions from App page
  const data = useContext(Context);

  const nav = useNavigate();

  //hook for show/hide device select tag && show/hide plusIcon
  const [isDeviceListShown, setIsDeviceListShown] = useState([false, 'block']);

  const showDeviceAndAdd = () => {
    if (isDeviceListShown[0]) {
      if (props.room.deviceArr.length == 6) {
        return alert("you can't add more devices");
      }
      let deviceListRepresent = [];
      let isExistStereo = false;
      props.room.deviceArr.forEach((device) => {
        if (device.type == 'stereo system') {
          isExistStereo = true;
        }
      })
      // define what list of devises to represent according to a rools
      if (props.room.type == 'bathroom' && !isExistStereo) {
        deviceListRepresent = data.deviceListRules[0];
      } else if (props.room.type == 'bathroom' && isExistStereo) {
        deviceListRepresent = data.deviceListRules[1];
      } else if (props.room.type != 'bathroom' && !isExistStereo) {
        deviceListRepresent = data.deviceListRules[2];
      } else if (props.room.type != 'bathroom' && isExistStereo) {
        deviceListRepresent = data.deviceListRules[3];
      }

      return (
        <div className="container">
          {/* select a device */}
          <div className='row justify-content-center'>
            <div className='col col-7'>
              <select className="form-select" id='deviceListSelect'>
                {deviceListRepresent.map((device) => {
                  return <option value={device}>{device}</option>
                })}
              </select>
            </div>
          </div>
          {/* Add button */}
          <div className="one-room-add-button" onClick={() => {
            let choosenDevice = document.getElementById('deviceListSelect').value;
            data.addDeviceFunc(choosenDevice, props.roomId);
            if (props.room.deviceArr.length == 6) {
              //if there is 6 devises hide add-plus button
              setIsDeviceListShown([false, 'none']);
            } else {
              setIsDeviceListShown([false, 'block']);
            }
          }}>
            <img src={Add} alt="Add" />
          </div>
        </div >
      )
    }
  }

  return (
    <div className='one-room-page'>

      <div className='one-room-top'>
        {/* Room Name */}
        <div className='one-room-header'>
          <div className='one-room-name'>
            <span>{props.room.name}</span>
            {props.room.type}
          </div>
          {/* delete Button */}
          <div className="one-room-erase-button"
            onClick={() => {
              data.eraseRoomFunc(props.roomId);
              nav('/');
            }}>
            <i class="fa fa-trash-o"></i>
          </div>
        </div>
        {/* show all devices that user choosed */}
        <DeviseInRoom devisesInRoom={props.room.deviceArr} roomId={props.roomId} setIsDeviceListShown={setIsDeviceListShown} />
      </div>

      {showDeviceAndAdd()}
      {/* add-Plus Button */}
      <img style={{ display: isDeviceListShown[1] }} onClick={() => (setIsDeviceListShown([true, 'none']))} src={Plus} alt="PlusIcon" />
    </div >

  )
}
