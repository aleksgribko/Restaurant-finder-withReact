import React from "react";

import $ from "jquery";

function RestoOnMap(props) {
	let divClasses = `${
		props.type === "featured" ? "pointerRestoFeatured" : "pointerResto"
	} forFilter`;
 
	
	function switchOverlay() {
		let clicked = props.id		
		$(`.${clicked}`)[0].click(); 
	}

	function hoveredResto() {
		let tag = document.getElementById(props.id);
		let x = parseInt(tag.style.width, 10);
		let y = parseInt(tag.style.height, 10);
		x += x;
		y += y;
		tag.style.width = `${x}px`;
		tag.style.height = `${y}px`;
	}

	function unhoveredResto() {
		let tag = document.getElementById(props.id);
		tag.style.width = `${props.size * 2}px`;
		tag.style.height = `${props.size * 2}px`;
	}

	return (
		<div
			id={props.id}
			style={{
				width: props.size * 2,
				height: props.size * 2,
				position: "absolute",
				transform: "translate(-50%, -50%)"
			}}
			name={props.name}
			lat={props.lat}
			lng={props.lng}
			className={divClasses}
			onClick={switchOverlay}
			onMouseOver={hoveredResto}
			onMouseOut={unhoveredResto}
			rating={props.rating}
		>
			<span className="tooltiptext">{props.name}</span>
		</div>
	);
}

export default RestoOnMap;
