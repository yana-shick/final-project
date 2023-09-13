import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context";

import Add from "./img/add.svg";

export default function AddRoom() {
	const nav = useNavigate();
	//use context - all my values and functions from App page
	const data = useContext(Context);

	// hooks for user inputs
	const [roomTypeInp, setRoomTypeInp] = useState("");
	const [roomNameInp, setRoomNameInp] = useState("");
	const [roomColorInp, setRoomColorInp] = useState("");

	// validate inputs and go to home('/') page
	const validateAdd = () => {
		if (data.userRoomArr.length == 6) {
			alert("no more rooms");
			return;
		}
		if (roomTypeInp != "" && roomNameInp.length >= 1) {
			data.addRoomFunc(roomTypeInp, roomNameInp, roomColorInp);
			nav("/final-project");
		} else {
			alert("please, fill form");
		}
	};

	return (
		<div className="add-room-page">
			<div className="add-room-menu container">
				<div className="row justify-content-center g-4">
					{/* select type of a room// must be */}
					<div className="col col-sm-5 mx-5">
						<select
							className="form-select"
							onChange={(e) => {
								setRoomTypeInp(e.target.value);
							}}
						>
							<option hidden value="">
								choose a type
							</option>
							{data.roomTypeList.map((roomType) => {
								return <option>{roomType}</option>;
							})}
						</select>
					</div>

					{/* give a name to a room// must be */}
					<div className="col col-sm-5 mx-5">
						<input
							className="form-control"
							onChange={(e) => {
								setRoomNameInp(e.target.value);
							}}
							maxLength="5"
							type="text"
							placeholder="give a name"
						/>
					</div>
					{/* define a color of a room// optional */}
					<div className="col col-sm-5 mx-5">
						<select
							className="form-select"
							onChange={(e) => {
								setRoomColorInp(e.target.value);
							}}
						>
							<option hidden value="">
								select a color
							</option>
							{data.roomColorList.map((roomColor) => {
								return <option>{roomColor}</option>;
							})}
						</select>
					</div>
				</div>
			</div>

			{/* add-Vi button */}
			<img src={Add} onClick={validateAdd} alt="AddIcon" />
		</div>
	);
}
