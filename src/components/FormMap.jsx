import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import store from '../stores/pollStore.js';
import preFetchedPollingPlaces from '../map/preFetchedPollingPlaces.js'

export default class FormMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ppid: null,
      lat: null,
      long: null,
      placeName: null,
      address: null,
      userLat: null,
      userLong: null,
      store: store
    };
  }
  render() {
    var map = null;
    var zoom = null;
    var markers = [];
    var center = [this.props.approxLat, this.props.approxLong];

    const north = [38.721915564, -121.390968136]
    const east = [38.6648806855, -121.133173599]
    const south = [38.2571979184, -121.303787278]
    const west = [38.5026946913, -121.522912009]
    let bounds = [north, east, south, west]

    if (this.state.userLat && this.state.userLong) center = [this.state.userLat, this.state.userLong];
    if (this.state.lat && this.state.long) {
      zoom = 13;
      bounds = null;
      center = [this.state.lat, this.state.long];
      var ppid = this.state.userPpid;
      markers.push(
        <Marker color={this.props.activeColor} key={'marker-'+ppid} ppid={ppid} userPpid={ppid} onLeafletClick={this.handleMarkerClick} position={center}>
            <Popup key={'popup-'+ppid}>
              <span key={'popup-span-'+ppid}>{this.state.name}</span>
            </Popup>
          </Marker>
      )
    } else {
      center = null;
      zoom = null;
      markers = this.allPlaceMarkers();
    }
    map = (
        <Map 
          zoom={zoom} 
          center={center} 
          className="full-height" 
          bounds={bounds} 
          style={{height: '100vh'}}
          scrollWheelZoom={false}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        {markers}
        </Map>
    )
    return (
      <div id="map-container">
        {map}
      </div>
    )
  }
  componentDidMount() {
    store.observeChanges(this.getStoreState.bind(this));
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log('got position!! ' + pos.coords.latitude);
        this.setState({userLat: pos.coords.latitude, userLong: pos.coords.longitude});
      });
    }
  }
  componentWillUnmount() {
    store.unobserveChanges(this.getStoreState.bind(this));
  }
  getStoreState(o) {
    console.log('FormMap getStoreState: ');
    console.log(o);
    this.setState({ppid: o.ppid, lat: o.ppLat, long: o.ppLong, placeName: o.ppName, address: o.ppAddress});
  }
  handleMarkerClick(event) {
    console.log('two FormMap marker clicked with ppid: ' + this.options.ppid);
    var markerPpid = parseInt(this.options.ppid || 0);
    var userPpid = parseInt(this.options.userPpid || 0);
    if (markerPpid !== userPpid) {
      //Change the caption and accessibility data
      store.setPPID(markerPpid);
      //Make clear this is definitely not the user's assigned polling place
      //this.setState({caption: ''})
    }
  }
  allPlaceMarkers() {
    var markers = [];
    for (let ppid in preFetchedPollingPlaces) {
      let lat = Number(preFetchedPollingPlaces[ppid].Latitude);
      let latDev = lat / this.props.approxLat;
      let long = Number(preFetchedPollingPlaces[ppid].Longitude);
      let ppName = preFetchedPollingPlaces[ppid]['Polling Place name'];
      let longDev = long / this.props.approxLong;
      if (latDev > 0.9 && latDev < 1.1 && longDev > 0.9 && longDev < 1.1 && ppName) {
        markers.push(
          <Marker color={this.props.light} key={'marker-'+ppid} ppid={ppid} userPpid={this.state.userPpid} onLeafletClick={this.handleMarkerClick} position={[lat, long]}>
              <Popup key={'popup-'+ppid}>
                <span key={'popup-span-'+ppid}>{ppName}</span>
              </Popup>
            </Marker>
        )
      }
    }
    return markers
  }
}

FormMap.defaultProps = {
  light: '#D3F2BE',
  activeColor: '#37AF14'
}
