import React, {Component} from 'react'
import Overlay from './Overlay.js'
import HeaderResto from './HeaderResto.js'
import $ from 'jquery'


class OneRestorant extends Component {
	constructor(props){
		super (props)
		this.state={
			urlPic: '',
			lat: this.props.lat,
			lng: this.props.lng,
		}		
		this.switchOverlay = this.switchOverlay.bind(this)			
	}

	switchOverlay() {		//hide all overlays
		let returnedElemets = document.getElementsByClassName('overlay')
		for (let oneOverlay of returnedElemets)
			oneOverlay.style.display = "none";
		$( '.img' ).attr("src", '')

		console.log('reviews from One resaurant', this.props.reviews)

		let thisName = this.props.name
		document.getElementById(thisName).style.display = "block";
	fetch(`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${this.state.lat},${this.state.lng}&fov=90&heading=235&pitch=10&key=AIzaSyDCJD8ghgxEJJdmUIr9_m0mY_wBEUOW5Dw`) // input key here for streetview
      	.then(response => $( '.img' ).attr("src", response.url))
      //  AIzaSyDCJD8ghgxEJJdmUIr9_m0mY_wBEUOW5Dw
           // timely:
          // this.setState({urlPic: 'https://www.muralswallpaper.com/app/uploads/Kids-Pink-Pop-Up-Rabbits-Wallpaper-Mural-Square-400x400.jpg'})           
       }

    shouldComponentUpdate(nextProps, nextState) { 
    return nextProps.reviews !== this.props.reviews; 
	}

    
   render(){	
   console.log('reviews in OneRestaurant', this.props)

   	return(
   		 <div>
   		 <Overlay 
	   		 key={this.props.key}
	   		 name={this.props.name}
	   		 address={this.props.address} 		     
		     rating={this.props.rating}
		     reviews={this.props.reviews}		     	
          
	     />	        				
	     <HeaderResto 
		    className="hotel_header" 
		    name={this.props.name}
		    size={this.props.size}
		    href="#"			
			onClick={this.switchOverlay}
			id={this.props.id}
			zoom={this.props.zoom}
		
		/>
		<div>address: {this.props.address}</div>
		<div>ratings: {this.props.rating}</div>
		<hr />
		</div>
		)
   }
}

export default OneRestorant


