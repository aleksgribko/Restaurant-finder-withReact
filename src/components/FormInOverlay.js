import React, { Component } from "react";
import $ from "jquery";

class FormInOverlay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0,
			text: "",
			reviewList: this.props
		};

		this.receiveReview = this.receiveReview.bind(this);
		this.handleChangeStars = this.handleChangeStars.bind(this);
		this.handleChangeReview = this.handleChangeReview.bind(this);
	}

	receiveReview(e) {
		e.preventDefault();
		if (this.state.rating !== 0 && this.state.text !== "") {
			this.props.storeNewReview(this.state.rating, this.state.text);
			this.setState({
				rating: 0,
				text: ""
			});			
			$("select").val("0");
			$("textarea").val("");
		}
	}

	handleChangeStars(event) {
		this.setState({
			rating: event.target.value
		});
	}

	handleChangeReview(event) {
		this.setState({
			text: event.target.value
		});
	}

	render() {
		return (
			<div>
				<button
					style={{ height: "50px", marginTop: "10px" }}
					className="button"
					onClick={() => $("form").slideToggle(500)}
				>
					Leave a review
				</button>
				<form
					className='formInOverlay'
					style={{						
						fontSize: "1rem",						
						paddingTop: "10px"
					}}
				>
					<label style={{textAlign: 'center'}}>
						Rate this restoraunt:
						<select onChange={this.handleChangeStars} style={{marginLeft: '5px'}}>
							<option disabled selected value />
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>						
					</label><br />
					<textarea
						name="newReview"
						onChange={this.handleChangeReview}
					/>
					<br />
					<button
						className="button"
						style={{
							height: "50px",							
							marginTop: "10px"
						}}
						onClick={this.receiveReview}
					>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default FormInOverlay;
