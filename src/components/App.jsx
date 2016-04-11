import React, { Component } from 'react';
import PollingPlaceForm from './PollingPlaceForm'
import FormMap from './FormMap'
import AccessibilityStory from './AccessibilityStory'


export class App extends Component {

  render() {
    return (
    	<div>
	      <PollingPlaceForm approxLat={this.props.approxLat} approxLong={this.props.approxLong} />
        <FormMap approxLat={this.props.approxLat} approxLong={this.props.approxLong} />
        <AccessibilityStory />
      </div>
    );
  }
}

App.defaultProps = {
  approxLat: '38.5789777', //geocoding bias
  approxLong: '-121.4829292', //geocoding bias
};
