import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../context';


export default function DeviseInRoom(props) {
    //use context - all my values and functions from App page
    const data = useContext(Context);

    // reload to display a change in color
    const [reload, setReload] = useState('');

    const activate = (device) => {
        device.activate();
        setReload(reload + '1');
    }

    return (
        <div className='device-in-room-page container'>
            <div class="row gy-2 justify-content-center">
                {props.devisesInRoom.map((device, i) => {
                    return (
                        <div className="col col-5" id='device-in-room-col'>
                            <div className='device-in-room' id='device-in-room' onClick={() => { activate(device) }}
                                style={{ backgroundColor: device.backgroundColor }}>
                                <button id='device-in-room-delete' onClick={() => {
                                    data.deleteDevice(i, props.roomId);
                                    props.setIsDeviceListShown([false, 'block']);
                                }}>X</button>
                                {device.type}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

