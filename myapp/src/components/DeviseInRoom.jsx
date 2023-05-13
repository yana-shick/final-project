import React from 'react'
import { useState } from 'react'


export default function DeviseInRoom(props) {

    const [reload, setReload] = useState('');


    const activate = (device) => {
        device.activate();
        setReload(reload + '1');
    }

    return (
        <div className='device-in-room-page'>
            {props.choosenDevices.map((device) => {
                return (
                    <button className='device' onClick={() => { activate(device) }}
                        style={{ backgroundColor: device.backgroundColor }}> {device.type}</button>
                )
            })}
        </div >
    )
}

