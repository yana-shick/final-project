import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Title from './components/Title';
import RoomsMenu from './components/RoomsMenu';
import OneRoom from './components/OneRoom';
import AddRoom from './components/AddRoom';


const roomTypeList = ['badroom', 'bathroom', 'kitchen'];

const deviceListBath = ['central air', 'boiler', 'stereo system', 'lamp'];
const deviceListShortBath = ['central air', 'boiler', 'lamp'];
const deviceListElse = ['central air', 'stereo system', 'lamp'];
const deviceListShortElse = ['central air', 'lamp'];

const deviceListRules = [deviceListBath, deviceListShortBath, deviceListElse, deviceListShortElse]


let activeColor = 'red';
let inactiveColor = 'green';

class Room {
  deviceArr = [];
  constructor(type, name, color) {
    this.type = type;
    this.name = name;
    this.color = color;
    this.pathName = `/room_${this.name}`
  }
}

class Device {
  isActivated = false;
  backgroundColor = inactiveColor;
  constructor(type) {
    this.type = type;
  }
  activate = () => {
    if (!this.isActivated) {
      this.isActivated = true;
      this.backgroundColor = activeColor;
    }
    else {
      this.isActivated = false;
      this.backgroundColor = inactiveColor;
    }
  }
}


function App() {

  const [userRoomArr, setUserRoomArr] = useState([]); // all rooms than user created

  const addRoomFunc = (type, name, color) => { // user creats new room from page /addroom componenta AddRoom
    let room = new Room(type, name, color);
    setUserRoomArr([...userRoomArr, room]); // add room to userRoomArr
  }

  const addDevice = (type, roomId) => { // user add devise from page /room+name componenta OneRoom
    let device = new Device(type);
    userRoomArr[roomId].deviceArr.push(device); // 
  }


  return (
    <div className="App">
      <Title />
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<RoomsMenu userRoomArr={userRoomArr} />}></Route>
          <Route path='/addroom' element={<AddRoom roomTypeList={roomTypeList} addRoomFunc={addRoomFunc} />}></Route>

          {userRoomArr.map((room, id) => {
            return <Route path={room.pathName} element={<OneRoom room={room}
              roomId={id} deviceListRules={deviceListRules} addDevice={addDevice} />}></Route>
          })}

        </Routes>
      </BrowserRouter >
    </div >
  );
}

export default App;




