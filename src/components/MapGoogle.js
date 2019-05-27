import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import restaurantsData from "./restaurantsData.js";
import MyPositionElement from "./MyPositionElement.js";
import RestoOnMap from "./RestoOnMap.js";
import $ from "jquery";
import AddnewRestaurant from "./AddnewRestaurant.js";

class MapGoogle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      user: null,
      clicked: {
        lat: 0,
        lng: 0,
        address: ""
      },
      zoom: 13,
      aroundRestaurants: [],
      map:'',
      maps:'',  

    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          user: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      }, this.showError);
    } else {
      alert("Sorry, geolocation is not supported by this browser");
    }

    this.showError = this.showError.bind(this);
    this.whatIsAround = this.whatIsAround.bind(this);
    this.featuredRestaraunts = this.featuredRestaraunts.bind(this);
    this.findRestaurantsAround = this.findRestaurantsAround.bind(this);
    this.findMeClicked = this.findMeClicked.bind(this);
    this._onChange = this._onChange.bind(this);
    this.loadTheMap = this.loadTheMap.bind(this);
    this.saveDataOfInputRestaurant = this.saveDataOfInputRestaurant.bind(this);

  }

  

  whatIsAround(map, maps) {
    let request = {
      location: this.state.user,
      radius: "1000",
      type: ["restaurant"]
    };

    this.setState(
    {
      map: map,
      maps: maps
    })

    this.props.getMapObjects(map, maps)

    let service = new maps.places.PlacesService(map);    

    //FIND restaurants around

    service.nearbySearch(request, (results, status) => {
      if (status === maps.places.PlacesServiceStatus.OK) {        
        for (let i=0; i<results.length; i++){          
          let completePlace = {
            id: results[i].id, 
            place_id: results[i].place_id,    
            restaurantName: results[i].name,
            address: results[i].vicinity,
            lat: results[i].geometry.location.lat(),
            lng: results[i].geometry.location.lng(),
            rating: results[i].rating,         
            reviews: [],
            type: "found"
          };

          //GRAB DETAILS about restaurants around

          let restaurants = [...this.state.aroundRestaurants];
          restaurants.push(completePlace);          
          this.setState({ aroundRestaurants: restaurants });   
          if(results.length === restaurants.length){
            this.props.storeRestaurants(restaurants);  
          }       
        }
      } 
    });    

    maps.event.addListener(map, "dblclick", e => {
      if (e) {
        $("#addRestForm").css("display", "block");

        //  define a new restaurant by clicked coordinates and setState

        var geocoder = new maps.Geocoder();
        geocoder.geocode({ location: e.latLng }, (whatIsHere, status) => {
          if (status === "OK") {
            if (whatIsHere[0]) {
              this.setState({
                clicked: {
                  address: whatIsHere[0].formatted_address,
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng()
                }
              });
            } else {
              window.alert("No results found");
            }
          } else {
            window.alert("Geocoder failed due to: " + status);
          }
        });
      }
    });
  }

  saveDataOfInputRestaurant(nameOfAddedResto) {
    if (nameOfAddedResto !== "") {
      $("#addRestForm").css("display", "none");
      $("form > input").val("");

      let newRestoByUser = {
        id: this.state.clicked.lat,
        restaurantName: nameOfAddedResto,
        address: this.state.clicked.address,
        lat: this.state.clicked.lat,
        lng: this.state.clicked.lng,        
        reviews: [],
        type: "added"
      };

      let restaurants = [...this.state.aroundRestaurants];
      restaurants.push(newRestoByUser);

      this.setState({ aroundRestaurants: restaurants });

      this.props.storeRestaurants(restaurants);      
    }
  }

  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert(
          "User denied the request for Geolocation. To use this site properly you need to allow geolocation requests"
        );
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("nothing");
    }
  }

  findMeClicked() {
    this.setState({
      center: {
        lat: this.state.user.lat,
        lng: this.state.user.lng
      },
      zoom: 13
    });
  }

  _onChange({ center, zoom }) {
    this.setState({
      center: center,
      zoom: zoom
    });
  }

  featuredRestaraunts() {
    let restaurants = restaurantsData.map(resto => (
      <RestoOnMap
        id={resto.id}
        key={resto.id}
        name={resto.restaurantName}
        lat={resto.lat}
        lng={resto.lng}
        type={"featured"}
        size={this.state.zoom}
        address={resto.address}
        rating={resto.rating}
        reviews={resto.reviews}
        switchOverlay={this.props.switchOverlay}
     
      />
    ));
    return restaurants;
  }

  findRestaurantsAround() {
    if (this.state.aroundRestaurants.length > 0) {
      let restaurants = this.state.aroundRestaurants.map(resto => (
        <RestoOnMap
          id={resto.id}
          key={resto.id}
          name={resto.restaurantName}
          lat={resto.lat}
          lng={resto.lng}
          size={this.state.zoom}
          address={resto.address}
          rating={resto.rating}
          reviews={resto.reviews}
          switchOverlay={this.props.switchOverlay}
        
        />
      ));
      return restaurants;
    } 
  }

  componentDidMount() {    
    this.props.checkZoomFunction(this.state.zoom);
  }

  loadTheMap() {
    if (this.state.center !== null) {
      return (
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyDCJD8ghgxEJJdmUIr9_m0mY_wBEUOW5Dw",
            libraries: "places"
          }}
          center={this.state.center}
          zoom={this.state.zoom}
          onChange={this._onChange}
          defaultZoom={13}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            this.whatIsAround(map, maps);
          }}
        >
          <MyPositionElement
            size={this.state.zoom}
            lat={this.state.user.lat}
            lng={this.state.user.lng}
          />
          {this.featuredRestaraunts()}
          {this.findRestaurantsAround()}
        </GoogleMapReact>
      );
    } else {
      return <p>LOADING</p>;
    }
  }

  render() {      
   
      $("#findMeButton").click(this.findMeClicked);    

    return (
      <div className="mapContainer">
        <AddnewRestaurant addNewRestaurant={this.saveDataOfInputRestaurant} />
        {this.loadTheMap()}
      </div>
    );
  }
}

export default MapGoogle;
