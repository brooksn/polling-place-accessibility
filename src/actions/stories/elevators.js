var and = require('join-component');

var elevators = function(pollingPlace) {
  var response = { summary: 'There are no elevators or lifts.', warnings: [] };

  var elevatorsData = pollingPlace['Elevators & Lifts'].root;
  var outsideElevator = pollingPlace['Elevators & Lifts']['1-Main-Entry-Floor-Outside-the-Elevator'];
  var votingArea = pollingPlace['Elevators & Lifts']['2-Voting-Area-Floor-Outside-the-Elevator'];
  var inside = pollingPlace['Elevators & Lifts']['3-Inside-the-Elevator'];
  var controls = pollingPlace['Elevators & Lifts']['4-Control-Panel'];
  var emergency = pollingPlace['Elevators & Lifts']['5-Emergency-Controls'];
  var carsize = pollingPlace['Elevators & Lifts']['6-Car-Dimensions'];
  var wheelchair = pollingPlace['Elevators & Lifts']['8-Wheelchair-Lifts'];

  if ( outsideElevator === undefined || outsideElevator.qid_1.answer === "N/A" ) { 
    return response; 
  }

  if ( outsideElevator.qid_2.answer === 'No' || outsideElevator.qid_3.answer === 'No' ) {
    response.warnings.push('The area before the elevator may be narrow or obstructed.');
  }

  // TODO: Add more questions

  if ( response.warnings.length > 0 ) {
    response.summary = "There are a few accessibility issues with the elevators or lifts:";
  } else {
    response.summary = "The elevators and/or lifts are fully accessible to all.";
  }

  return response;
};

module.exports = elevators;
