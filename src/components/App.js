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
      zoom: 1
    };
    this.storeRestaurants = this.storeRestaurants.bind(this);
    this.featuredRestaraunts = this.featuredRestaraunts.bind(this);
    this.checkZoom = this.checkZoom.bind(this);
  }

  storeRestaurants(list) {
    this.setState({
      listOfRestaurants: list
    });
  }

  checkZoom(zoom) {
    this.setState({
      zoom: zoom
    });
  }

  featuredRestaraunts() {
    let restaurants = restaurantsData.map(resto => (
      <OneRestorant
        id={resto.id}
        name={resto.restaurantName}
        address={resto.address}
        lat={resto.lat}
        lng={resto.lng}
        rating={resto.rating}
        reviews={resto.reviews}
        zoom={this.state.zoom}
        type={"featured"}
      />
    ));
    return restaurants;
  }

  restaurantUpdate() {
    if (this.state.listOfRestaurants != []) {
      let restaurants = this.state.listOfRestaurants.map(resto => (
        <OneRestorant
          id={resto.id}
          name={resto.restaurantName}
          address={resto.address}
          lat={resto.lat}
          lng={resto.lng}
          reviews={resto.reviews} // PASSES EVERY PROP except reviews! Console.log shows, that data comes as complete (including reviews)
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
