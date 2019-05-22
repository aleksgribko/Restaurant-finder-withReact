import React, { Component } from "react";
import $ from "jquery";

class AddnewRestaurant extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nameOfNewRestaurant: ""
		};

		this.cancel = this.cancel.bind(this);
		this.handleChangeReview = this.handleChangeReview.bind(this);
	}

	cancel() {
		$("form > input").val("");
		this.setState({
			nameOfNewRestaurant: ""
		});
		$("#addRestForm").css("display", "none");
	}

	handleChangeReview(event) {
		this.setState({
			nameOfNewRestaurant: event.target.value
		});
	}

	render() {
		return (
			<div id="addRestForm" style={{ display: "none" }}>
				<form style={{ display: "block" }}>
					Type the name of a new restaurant <br />
					<input
						type="text"
						name="name"
						id="nameOfNewRestaurant"
						onChange={this.handleChangeReview}
					/>
					<br />
					<input
						type="button"
						name="send"
						onClick={() =>
							this.props.addNewRestaurant(
								this.state.nameOfNewRestaurant
							)
						}
						value="Add"
					/>
					<input
						type="button"
						name="cancel"
						onClick={this.cancel}
						value="Cancel"
					/>
				</form>
			</div>
		);
	}
}

export default AddnewRestaurant;
