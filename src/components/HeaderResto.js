import React from "react";

function HeaderResto(props) {
	let x, y;

	function hoveredResto() {
		let tag = document.getElementById(props.id);
		x = parseInt(tag.style.width, 10);
		y = parseInt(tag.style.height, 10);
		x += x;
		y += y;
		tag.style.width = `${x}px`;
		tag.style.height = `${y}px`;
	}

	function unhoveredResto() {
		let tag = document.getElementById(props.id);
		x = x / 2;
		y = y / 2;
		tag.style.width = `${x}px`;
		tag.style.height = `${y}px`;
	}

	return (
		<span
			className={`${props.id} linkName`}			
			onMouseOver={hoveredResto}
			onMouseOut={unhoveredResto}
			href="#"
			onClick={props.onClick}			
		>
			Restaurant: {props.name}
		</span>
	);
}

export default HeaderResto;
