import React from 'react';

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'About';
    }

    getStyles() {
    	return {
    		root: {
				display: 'flex',
				flexDirection: 'column',
				fontSize: 28,
				padding: '10px 50px',
			},
			header: {
				fontSize: 40,
				fontWeight: 'normal',
				fontStyle: 'normal',
				textAlign: 'center'
			},
			headers: {
				marginTop: 5,
				marginBottom: 0,
			},
			info: {
				display: 'flex',
				flexDirection: 'column',
				margin: '10px 0'
			},
    	}
    }

    render() {
    	const styles = this.getStyles()
        return <div style={styles.root}>
        	<div style={styles.info}>
    			<h1 style={styles.header}>About</h1>
        	</div>
        	<div style={styles.info}>
        		<h2 style={styles.headers}>Our Mission</h2>
        		<p>This app was created as a part of Hack4Sac's county innovation challenge.</p>
        		<p>We believe that voters with specific needs are people too, and that they are often cast aside when creating
        		products or services.</p>
          <p>That's why we created this app. We tried our best to design the app to be easy for
        		people with special needs to use. </p>
        		<p>One very helpful tool that we recommend all developers use is <a href="http://khan.github.io/tota11y/">Khan Academy's tota11y</a>.</p>
        	</div>
        	<div style={styles.info}>
        		<h2 style={styles.headers}>Giving Back</h2>
        		<p>We believe in our mission so much, we will put our money where our mouth is.</p>
        		<p>If we win the Hack4Sac challenge, we will donate 20% of our winnings to the <a href="http://www.aapd.com/">American Association
        		of People with Disabilities (AAPD)</a>.</p>
        		<p>If you'd like to donate now, please click <a href="https://aapd.kindful.com/?campaign=238334">here to donate to the AAPD</a></p>
        	</div>
        	<div style={styles.info}>
        		<h2 style={styles.headers}>Our Team</h2>
        		<p>Rasheed Bustamam, software engineer at CoNarrative</p>
        		<p><a href="https://github.com/brooksn">Brooks Newberry</a>, environmental sciences major at UC Davis</p>
        		<p>Nate Cornell, software developer</p>
        		<p>Hans Chun, software developer</p>
        	</div>
        </div>
    }
}
