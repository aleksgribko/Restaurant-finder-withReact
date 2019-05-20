import React, { Component } from "react";
import MapGoogle from "./MapGoogle.js";
import OneRestorant from "./OneRestorant.js";
import Nav from "./Nav.js";
import restaurantsData from "./restaurantsData.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      listOfRestaurants: [],
      zoom: 1,
      gotList: true,
      recievedRevies:[],
      map: '',
      maps: ''
    };
    this.storeRestaurants = this.storeRestaurants.bind(this);
    this.featuredRestaraunts = this.featuredRestaraunts.bind(this);
    this.checkZoom = this.checkZoom.bind(this);
    this.passReviews = this.passReviews.bind(this)
    this.getMapObjects = this.getMapObjects.bind(this)
  }

  storeRestaurants(list) {
    console.log('list', list)
    this.setState({
      listOfRestaurants: list,
      gotList: true       
    });
  }

  checkZoom(zoom) {
    this.setState({
      zoom: zoom
    });
  }

  passReviews(reviews){
    this.setState({
      recievedRevies: reviews
    })
  }

  getMapObjects(map, maps){
    this.setState({
      map: map,
      maps: maps
    })
  }

  featuredRestaraunts() {
    
    let restaurants = restaurantsData.map(resto => (
      <OneRestorant
        type={"featured"}
        id={resto.id}
        name={resto.restaurantName}
        address={resto.address}
        lat={resto.lat}
        lng={resto.lng}
        rating={resto.rating}
        reviews={resto.reviews}
        zoom={this.state.zoom}        
      />
    ));
    return restaurants;
 
  }

  restaurantUpdate() {
    if(this.state.gotList){
      let restaurants = this.state.listOfRestaurants.map(resto => (
        <OneRestorant
          type={"found"}
          id={resto.id}
          place_id={resto.place_id}
          name={resto.restaurantName}
          address={resto.address}
          lat={resto.lat}
          lng={resto.lng}
          reviews={this.state.recievedRevies}
          map={this.state.map}
          maps={this.state.maps}
          rating={resto.rating}
          zoom={this.state.zoom}
        />
      ));      
      return restaurants;
     }
  }

  render() {       
    
    return (
      <div>
        <Nav />
        <div className="flex-container">
          <MapGoogle
            storeRestaurants={this.storeRestaurants}
            checkZoomFunction={this.checkZoom}
            findReviewsApp={this.findReviewsApp}          
            passReviews={this.passReviews}
            getMapObjects={this.getMapObjects}
          />
          <div id="list" style={{ paddingTop: "10px" }}>
            <h5>Our best offers:</h5>
            {this.featuredRestaraunts()}
            <h5>Restaurants for you:</h5>
            {this.restaurantUpdate()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
