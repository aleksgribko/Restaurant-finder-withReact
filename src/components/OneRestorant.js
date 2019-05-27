import React, { Component } from "react";
import Overlay from "./Overlay.js";
import HeaderResto from "./HeaderResto.js";
import $ from "jquery";

class OneRestorant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			urlPic: "",
			lat: this.props.lat,
			lng: this.props.lng,
			reviews: null
		};


		this.switchOverlay = this.switchOverlay.bind(this);
		this.saveNewComment = this.saveNewComment.bind(this);

	}

	switchOverlay() {		
		//hide all overlays
		let returnedElemets = document.getElementsByClassName("overlay");
		for (let oneOverlay of returnedElemets)
			oneOverlay.style.display = "none";
		$(".img").attr("src", "");

		fetch(
			`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${
				this.state.lat
			},${
				this.state.lng
			}&fov=90&heading=235&pitch=10&key=AIzaSyDCJD8ghgxEJJdmUIr9_m0mY_wBEUOW5Dw`
		).then(response => $(".img").attr("src", response.url));
		
		if (this.props.type === "found" && this.state.reviews === null) {			
			let reviews = [];

			var requestDetailed = {
				placeId: this.props.place_id,
				fields: ["reviews"]
			};

			let service2 = new this.props.maps.places.PlacesService(
				this.props.map
			);

				service2.getDetails(
					requestDetailed,
					(placeDetailed, status) => {
						if (
							status ===
							this.props.maps.places.PlacesServiceStatus.OK
						) {

							reviews = placeDetailed.reviews;
							this.setState({
								reviews: reviews ? reviews : []
							});							
						} 
					}
				);
			
		} else if (this.props.type === "featured" && this.state.reviews === null) {			
			this.setState({
				reviews: this.props.reviews
			});
		} else if (this.props.type === "added" && this.state.reviews === null){			
			this.setState({
				reviews: []
			});
		}		
		let thisName = this.props.name;
		document.getElementById(thisName).style.display = "block";		
	}

	saveNewComment(list) {
		this.setState({
			reviews: list
		});
	}

	render() {		
		return (
			<div className="forFilter" rating={this.props.rating}>
				<Overlay
					key={this.props.id}
					name={this.props.name}
					address={this.props.address}
					rating={this.props.rating}
					reviews={this.state.reviews}
					saveNewComment={this.saveNewComment}
				/>
				<HeaderResto
					name={this.props.name}
					size={this.props.size}				
					onClick={this.switchOverlay}
					zoom={this.props.zoom}
					id={this.props.id}
				/>
				<div>address: {this.props.address}</div>
				<div>ratings: {this.props.rating}</div>
				<hr />
			</div>
		);
	}
}

export default OneRestorant;
