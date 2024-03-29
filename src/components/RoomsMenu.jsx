import React from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Context } from "../context"

import Plus from "./img/plus-solid.svg"

export default function RoomsMenu() {
	//use context - all my values and functions from App page
	const data = useContext(Context)

	const nav = useNavigate()

	const showButton = () => {
		if (data.userRoomArr.length < 6) {
			return (
				<Link to="/addroom">
					<img src={Plus} alt="PlusIcon" />
				</Link>
			)
		}
	}
	return (
		<div className="rooms-menu-page">
			{/* display all rooms that user created */}
			<div className="rooms-menu container">
				<div class="row g-2 gy-4 g-sm-4 g-md-4 g-lg-5 g-xl-5 g-xxl-5 justify-content-center align-content-center">
					{data.userRoomArr.map((room) => {
						return (
							<div class="col col-5 col-md-4 rooms-menu-col ">
								<div
									className="room-button"
									style={{ backgroundColor: room.color }}
									// onClick open rooms page
									onClick={() => {
										nav(room.pathName)
									}}
								>
									{/* display room name */}
									<span>{room.name}</span>
									{room.type}
								</div>
							</div>
						)
					})}
				</div>
			</div>
			{/* add-Plus button */}
			{showButton()}
		</div>
	)
}
