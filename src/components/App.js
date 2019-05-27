import React, { Component } from "react";
import MapGoogle from "./MapGoogle.js";
import OneRestorant from "./OneRestorant.js";
import Nav from "./Nav.js";
import restaurantsData from "./restaurantsData.js";
import Filter from "./Filter.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      listOfRestaurants: [],
      zoom: 1,
      map: "",
      maps: ""
    };
    this.storeRestaurants = this.storeRestaurants.bind(this);
    this.featuredRestaraunts = this.featuredRestaraunts.bind(this);
    this.checkZoom = this.checkZoom.bind(this);
    this.getMapObjects = this.getMapObjects.bind(this);
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

  getMapObjects(map, maps) {
    this.setState({
      map: map,
      maps: maps
    });
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
        key={resto.id}
      />
    ));
    return restaurants;
  }

  restaurantUpdate() {
    let restaurants = this.state.listOfRestaurants.map(resto => (
      <OneRestorant
        type={resto.type}
        id={resto.id}
        place_id={resto.place_id}
        name={resto.restaurantName}
        address={resto.address}
        lat={resto.lat}
        lng={resto.lng}
        map={this.state.map}
        maps={this.state.maps}
        rating={resto.rating}
        zoom={this.state.zoom}
        key={resto.id}
      />
    ));
    return restaurants;
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
            getMapObjects={this.getMapObjects}
            switchOverlay={this.switchOverlay}
          />
          <div id="list" style={{ paddingTop: "10px" }}>
            <Filter />
            <h5 style={{ paddingTop: "10px" }}>Our best offers:</h5>
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
