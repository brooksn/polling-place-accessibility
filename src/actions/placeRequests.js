import request from 'superagent'
import _ from 'lodash'
import $ from 'jquery'

export function getZipCode(address, cb) {
  let zip
  request
    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDRoMwLIG_AcxMeha5PIv9lWnM0AwWRsCM`)
    .end((err, res) => {
      if (err || !res.ok) {
          throw new Error("There was an error!" + err)
      } else {
        let address_components = res.body.results[0].address_components
        let zipCode = _.filter(address_components, (component) => {
          return _.includes(component.types, 'postal_code')
        })[0].long_name
        // console.log(address, zipCode)
        zip = zipCode
        return cb(null, zipCode)
      }
    })
  return zip
}

export function getPollingPlaces(cb) {
  const url = 'https://www.googleapis.com/fusiontables/v2/query'
  const sql = `SELECT answer FROM 1Wps1_Vj4dkNiAIozL47QINAYAhonMgfVf0F3aPyR WHERE question IN ('Polling Place ID','Polling Place address', 'Polling Place name', 'City')`
	const apikey = 'AIzaSyDRoMwLIG_AcxMeha5PIv9lWnM0AwWRsCM'
  
  // $.ajax(`${url}?sql=${sql}&key=${apikey}`)
  //   .done((res,status) => {
  //     console.log(res.rows, status)
  //   })
  let returnVal = []
	request
      .get('https://www.googleapis.com/fusiontables/v2/query')
      .query({"sql": `SELECT answer FROM 1Wps1_Vj4dkNiAIozL47QINAYAhonMgfVf0F3aPyR WHERE question IN ('Polling Place ID','Polling Place address','City')`}) //  GROUP BY ppid is not working
      .query({key: apikey})
      .end(function(err, res){
        if (err || !res.ok) {
        	throw new Error("There was an error!" + err)
        } else {
          let rows = res.body.rows
          let rowLength = rows.length
          let i = 0
          for (let i = 0; i < rowLength; i += 3) {
            // console.log(rows[i][0], rows[i+1][0], rows[i+2][0])
            let r = {}
            r.ppid = rows[i][0]
            r.address = `${rows[i+1][0]} ${rows[i+2][0]}`
            getZipCode(r.address, (zip) => {
              
              r.zip = zip
            })
            // console.log(r)
            returnVal.push(r)
          }
          cb(returnVal)
        }
      });
      return returnVal

  // request
  //   .get('https://www.googleapis.com/fusiontables/v1/query')
  //   .query({"sql":"SELECT ppid FROM 1Wps1_Vj4dkNiAIozL47QINAYAhonMgfVf0F3aPyR GROUP BY ppid"})
  //   .query({"key":"AIzaSyDRoMwLIG_AcxMeha5PIv9lWnM0AwWRsCM"})
  //   // .redirects(0)
  //   .end(function(err, res){
  //     if (err || !res.ok) {
  //       console.log('Oh no! error');
  //     } else {
  //       console.log('yay got', res.body);
  //     }
  //   });

}