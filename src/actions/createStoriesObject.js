import parking from './stories/parking.js'
import restrooms from './stories/restrooms.js'
import paths from './stories/paths.js'
import signs from './stories/signs.js'
import votingArea from './stories/votingArea.js'
import elevators from './stories/elevators.js'
import doorways from './stories/doorways.js'

var createStoriesObject = function(pollingPlace) {
  var result = {};
  result.Parking = parking(pollingPlace);
  result.Restrooms = restrooms(pollingPlace);
  result['Paths of Travel'] = paths(pollingPlace);
  result.Signs = signs(pollingPlace);
  result['Voting Area'] = votingArea(pollingPlace);
  result['Elevators & Lifts'] = elevators(pollingPlace);
  result['Doorways'] = doorways(pollingPlace);
  result.Info = {
    ppid: pollingPlace['Polling Place Information']['1-Poll-Place-Information']['qid_1'].answer,
    name: pollingPlace['Polling Place Information']['1-Poll-Place-Information']['qid_2'].answer,
    address: pollingPlace['Polling Place Information']['1-Poll-Place-Information']['qid_3'].answer
  }
  return result;
};

export default createStoriesObject
