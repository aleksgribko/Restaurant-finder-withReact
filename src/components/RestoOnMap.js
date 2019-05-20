import React, { Component } from "react";

import $ from "jquery";

class RestoOnMap extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.switchOverlay = this.switchOverlay.bind(this);
		this.unhoveredResto = this.unhoveredResto.bind(this);
		this.hoveredResto = this.hoveredResto.bind(this);
	}

	switchOverlay() {
		//hide all overlays
		let returnedElemets = document.getElementsByClassName("overlay");
		for (let oneOverlay of returnedElemets)
			oneOverlay.style.display = "none";
		$(".img").attr("src", "");

		let thisName = this.props.name;
		document.getElementById(thisName).style.display = "block";
		fetch(
			`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${
				this.props.lat
			},${
				this.props.lng
			}&fov=90&heading=235&pitch=10&key=AIzaSyDCJD8ghgxEJJdmUIr9_m0mY_wBEUOW5Dw`
		) // input key here for streetview
			.then(response => $(".img").attr("src", response.url));

		let tag = document.getElementById(this.props.id);
		tag.style.width = `${this.props.size * 2}px`;
		tag.style.height = `${this.props.size * 2}px`;
	}

	hoveredResto() {
		let tag = document.getElementById(this.props.id);
		let x = parseInt(tag.style.width, 10);
		let y = parseInt(tag.style.height, 10);
		x += x;
		y += y;
		tag.style.width = `${x}px`;
		tag.style.height = `${y}px`;
	}

	unhoveredResto() {
		let tag = document.getElementById(this.props.id);
		tag.style.width = `${this.props.size * 2}px`;
		tag.style.height = `${this.props.size * 2}px`;
	}

	render() {
		return (
			<div
				id={this.props.id}
				style={{
					width: this.props.size * 2,
					height: this.props.size * 2,
					position: "absolute",
					transform: "translate(-50%, -50%)"
				}}
				name={this.props.name}
				lat={this.props.lat}
				lng={this.props.lng}
				className={
					this.props.type === "featured"
						? "pointerRestoFeatured"
						: "pointerResto"
				}
				onClick={this.switchOverlay}
				onMouseOver={this.hoveredResto}
				onMouseOut={this.unhoveredResto}
			>
				<span className="tooltiptext">{this.props.name}</span>
			</div>
		);
	}
}

export default RestoOnMap;
