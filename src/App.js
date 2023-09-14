import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Title from "./components/Title";
import RoomsMenu from "./components/RoomsMenu";
import OneRoom from "./components/OneRoom";
import AddRoom from "./components/AddRoom";

import { Context } from "./context";

// user can add maximum 6 devices to a room
// in each room only one stereo system
// boiler only for bathroom

//user can create maximum 6 rooms

const roomColorList = ["red", "orange", "yellow", "green", "blue", "purple"];

const roomTypeList = ["badroom", "bathroom", "kitchen"];

const deviceListBath = ["central air", "boiler", "stereo system", "lamp"];
const deviceListShortBath = ["central air", "boiler", "lamp"];
const deviceListElse = ["central air", "stereo system", "lamp"];
const deviceListShortElse = ["central air", "lamp"];

const deviceListRules = [
	deviceListBath,
	deviceListShortBath,
	deviceListElse,
	deviceListShortElse,
];

class Room {
	deviceArr = [];
	constructor(type, name, color) {
		this.id = Date.now();
		this.type = type;
		this.name = name;
		this.color = `var(--${color})`;
		this.pathName = `/room_${this.id}_${this.name}`;
	}
}

class Device {
	isActivated = false;
	backgroundColor = `var(--inactive)`;
	constructor(type) {
		this.type = type;
	}
	activate = () => {
		if (!this.isActivated) {
			this.isActivated = true;
			this.backgroundColor = `var(--active)`;
		} else {
			this.isActivated = false;
			this.backgroundColor = `var(--inactive)`;
		}
	};
}

function App() {
	const [userRoomArr, setUserRoomArr] = useState([]); // all rooms that user created

	// user creats new room from page /addroom componenta AddRoom
	const addRoomFunc = (type, name, color) => {
		let room = new Room(type, name, color);
		setUserRoomArr([...userRoomArr, room]); // add room to userRoomArr
		console.log(userRoomArr);
	};
	// user add devise from page /room+name componenta OneRoom
	const addDeviceFunc = (type, roomId) => {
		let device = new Device(type);
		let room = userRoomArr.find((val) => val.id == roomId);
		room.deviceArr.push(device); // add device to a room
		console.log("device added");
	};
	//user delets room from componenta OneRoom
	const eraseRoomFunc = (roomId) => {
		let temp = [...userRoomArr];
		let id = userRoomArr.findIndex((val) => val.id == roomId);
		temp.splice(id, 1);
		console.log("deleted");
		setUserRoomArr([...temp]);
	};
	//user delets device from componenta DeviseInRoom
	const deleteDevice = (deviseId, roomId) => {
		let temp = [...userRoomArr];
		let room = userRoomArr.find((val) => val.id == roomId);
		room.deviceArr.splice(deviseId, 1);
		setUserRoomArr([...temp]);
	};

	const data = {
		addRoomFunc,
		addDeviceFunc,
		eraseRoomFunc,
		setUserRoomArr,
		deleteDevice,
		userRoomArr,
		roomColorList,
		roomTypeList,
		deviceListRules,
		test: "test",
	};

	return (
		<div className="App container p-4">
			<Context.Provider value={data}>
				<BrowserRouter basename="final-project">
					<Title />
					<Routes>
						{/* main page */}
						<Route path="/" element={<RoomsMenu />}></Route>
						{/* add room page */}
						<Route path="/addroom" element={<AddRoom />}></Route>
						{/* page for each room */}
						{userRoomArr.map((room) => {
							return (
								<Route
									path={room.pathName}
									element={<OneRoom room={room} />}
								></Route>
							);
						})}
					</Routes>
				</BrowserRouter>
			</Context.Provider>
		</div>
	);
}

export default App;
