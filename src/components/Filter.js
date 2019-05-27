import React from "react";

function Filter() {

	let finder = {
		min : 0,
		max : 5
	}

	function handleChangeMin(event) {
		
		finder.min = event.target.value;
		filterMinMax()	
		
	}

	function handleChangeMax(event) {
		
		finder.max = event.target.value;		
		filterMinMax()	
	}

	function filterMinMax(){

		let arrayOfRestaurants = document.getElementsByClassName("forFilter");
		arrayOfRestaurants = Array.from(arrayOfRestaurants)		

		for (let resto of arrayOfRestaurants){
			//show all by default
			resto.style.display="block"
			if(resto.attributes.rating){
				if (resto.attributes.rating.value < finder.min || resto.attributes.rating.value > finder.max){
					resto.style.display="none"
				}			
			}
		}
	}

	return (
		<div style={{color: '#2B222C'}}>
			<span>Filter: from </span>
			<select onChange={handleChangeMin} defaultValue=''>
				<option disabled value=''/>			
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<span> to </span>
			<select onChange={handleChangeMax} defaultValue=''>
				<option disabled value=''/>				
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			<span> stars</span><br /><span style={{fontStyle: 'italic'}}>Double click on the map to add a new restaurant</span>
		</div>
	);
}

export default Filter;
