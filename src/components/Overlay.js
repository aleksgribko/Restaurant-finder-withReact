import React, { Component } from "react";

import $ from "jquery";
import OneReview from "./OneReview.js";
import FormInOverlay from "./FormInOverlay.js";

class Overlay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reviewList: this.props.reviews
		};
		this.off = this.off.bind(this);
		this.reviewListNew = this.reviewListNew.bind(this);
		this.storeNewReview = this.storeNewReview.bind(this);
	}

	off() {
		let thisName = this.props.name;
		document.getElementById(thisName).style.display = "none";
		$(".img").attr("src", "");
	}

	storeNewReview(rating, text) {
		let newReview = new Object({ rating: rating, text: text });
		let listForUpdate = this.state.reviewList;
		listForUpdate.unshift(newReview);
		this.setState({
			reviewList: listForUpdate
		});
	}

	reviewListNew() {
		if (this.state.reviewList.length !== 0) {
			console.log("this worked1");
			let newComments = this.state.reviewList.map(review => (
				<OneReview rating={review.rating} text={review.text} />
			));

			return newComments;
		} else {
			console.log("this worked2");
			return <p>No comments for this restaurant</p>;
		}
	}

	render() {
		console.log("props Restos in overlay", this.props.reviews);
		return (
			<div className="overlay" id={this.props.name}>
				<div id="inOverlay">
					<div
						className="overLayLeft"
						style={{
							textAlign: "center",
							marginTop: "10px",
							flexGrow: "1"
						}}
					>
						<h2 onClick={this.off}>{this.props.name}</h2>
						<p>address: {this.props.address}</p>
						<img
							className="img"
							alt="streetview"
							style={{ height: "400px" }}
						/>
					</div>

					<div
						className="overLayRight"
						style={{
							height: "90vh",
							marginTop: "10px",
							width: "25%",
							flexGrow: "1"
						}}
					>
						<h3>
							Average ranking:{" "}
							{this.props.rating ? this.props.rating : "-"}
						</h3>
						{this.reviewListNew()}
					</div>

					<div
						style={{
							height: "90vh",
							marginTop: "10px",
							width: "25%",
							flexGrow: "1"
						}}
					>
						<button
							style={{
								height: "50px",
								width: "100%",
								marginTop: "10px"
							}}
							onClick={this.off}
						>
							Back to the map
						</button>
						<FormInOverlay
							reviews={this.props.reviews}
							storeNewReview={this.storeNewReview}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Overlay;
