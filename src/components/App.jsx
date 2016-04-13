import React, { Component } from 'react';
import PollingPlaceForm from './PollingPlaceForm'
import PlaceMap from './PlaceMap'
import _ from 'lodash'
import FormMap from './FormMap'
import AccessibilityStory from './AccessibilityStory'
import Resources from './Resources'
import About from './About'
require('./../lib/tota11y.min.js')

const sacImage = require('./../assets/images/sacCapitol.jpg')

export class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentTab: 'find your polling place'
		}
	}

	getStyles() {
		return {
			root: {
				height: '100%',
				fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
			},
			header: {
				width: '100%',
				height: 300,
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
				textTransform: 'uppercase',
				fontWeight: 300,
				fontSize: '10vw',
				textShadow: '2px 2px #333',
				color: '#949494',
				textAlign: 'center',
				backgroundImage: `url("https://raw.githubusercontent.com/abustamam/polling-place-accessibility/master/public/images/sacCapitol.jpg")`,
				backgroundSize: 'cover',
				backgroundPosition: 'center center',
    			backgroundRepeat: 'no-repeat',
			},
			tabs: {
				width: '100%',
				height: 50,
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: 'center',
			},
			tab: (tab) => {
				return {
					cursor: 'pointer',
					background: tab === this.state.currentTab ? 'white' : 'rgba(1, 1, 1, .25)',
					boxShadow: tab === this.state.currentTab ? '' : '0px -2px 5px 0px #777 inset',
					borderTop: '1px solid black',
					borderLeft: '.5px solid black',
					borderRight: '.5px solid black',
					display: 'flex',
					flexGrow: 1,
					justifyContent: 'space-around',
					height: '100%',
					alignItems: 'center',
				}
			},
			currentTab: {
				height: 'calc( 100vh - 300px - 50px)'
			}
		}
	}

	render() {

		const tabs = ['find your polling place', 'map',  'resources', 'about']
		const styles = this.getStyles()

		let renderedTab = (tab) => {
			if (tab === 'map') {
				return <PlaceMap />
			} else if (tab === 'find your polling place') {
				return <div>
					<PollingPlaceForm approxLat={this.props.approxLat} approxLong={this.props.approxLong} />
					<AccessibilityStory />
			        <FormMap approxLat={this.props.approxLat} approxLong={this.props.approxLong} />
				</div>
			} else if (tab === 'resources') {
				return <Resources/>
			} else if (tab === 'about') {
				return <About/>
			}
		}

		return (
			<div style={styles.root}>
				<div style={styles.header} role="header">
					Poll Locations
				</div>
				<div style={styles.tabs} role="navigation">
					{_.map(tabs, tab => {
						return <div key={tab} style={styles.tab(tab)} onClick={()=>this.setState({currentTab: tab})}>
							<span>{_.capitalize(tab)}</span>
						</div>
					})}
				</div>
				<div style={styles.currentTab} role="main">
					{ renderedTab(this.state.currentTab) }
				</div>
	  		</div>
		);
	}
}

App.defaultProps = {
  approxLat: '38.5789777', //geocoding bias
  approxLong: '-121.4829292', //geocoding bias
};
