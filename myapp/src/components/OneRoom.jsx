import React from 'react'
import DeviseInRoom from './DeviseInRoom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Home from './img/home.svg';
import Plus from './img/plus-solid.svg';
import Add from './img/add.svg';

export default function OneRoom(props) {


  //hook for show/hode device select tag && show/hide plusIcon
  const [isDeviceListShown, setIsDeviceListShown] = useState([false, 'block']);

  const showDeviceAndAdd = () => {
    if (isDeviceListShown[0]) {
      if (props.room.deviceArr.length == 5) {
        return alert("you can't add more devices");
      }
      let deviceList = [];
      let isExistStereo = false;
      props.room.deviceArr.forEach((device) => {
        if (device.type == 'stereo system') {
          isExistStereo = true;
        }
      })
      if (props.room.type == 'bathroom' && !isExistStereo) {
        deviceList = props.deviceListRules[0];
      } else if (props.room.type == 'bathroom' && isExistStereo) {
        deviceList = props.deviceListRules[1];
      } else if (props.room.type != 'bathroom' && !isExistStereo) {
        deviceList = props.deviceListRules[2];
      } else if (props.room.type != 'bathroom' && isExistStereo) {
        deviceList = props.deviceListRules[3];
      }

      return (
        <div>
          <select id='deviceListSelect'>
            {
              deviceList.map((device) => {
                return <option value={device}>{device}</option>
              })}
          </select>
          <div style={{ border: 'none', backgroundColor: 'none', padding: '0px', height: '120px' }} onClick={() => {
            let choosenDevice = document.getElementById('deviceListSelect').value;
            props.addDevice(choosenDevice, props.roomId);
            setIsDeviceListShown([false, 'block']);
          }}><img src={Add} alt="Add" /></div>
        </div >
      )
    }

  }

  return (
    <div className='one-room-page'>

      <div className='one-room-container1'>
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* go to home page icon */}
          <Link to='/'><img src={Home} alt=" HomeIcon" /></Link>
          <div className='one-room-title'>{props.room.name} {props.room.type}</div>
        </div>
        {/* show all devices that user choosed */}
        <DeviseInRoom choosenDevices={props.room.deviceArr} />
      </div>

      {showDeviceAndAdd()}
      <img style={{ display: isDeviceListShown[1] }} onClick={() => (setIsDeviceListShown([true, 'none']))} src={Plus} alt="PlusIcon" />

    </div>

  )
}
