var and = require('join-component');

var votingArea = function(pollingPlace) {

  var site = pollingPlace;
  var votingAreaData = site['The Voting Area'].root;
  var response = { summary: 'No voting area details.', warnings: new Set() };

  var stablePath = ( votingAreaData.qid_1.answer === 'Yes' ) ? true : false;
  var protusionsLT4in = ( votingAreaData.qid_2.answer === 'Yes' ) ? true : false;
  var protusionsLT12in = ( votingAreaData.qid_3.answer === 'Yes' ) ? true : false;
  var overheadObstaclesBarred = ( votingAreaData.qid_4.answer === 'Yes' ) ? true : false;
  var wheelchairSpace = ( votingAreaData.qid_5.answer === 'Yes' ) ? true : false;
  var easyEmergencyExit = ( votingAreaData.qid_6.answer === 'Yes' ) ? true : false;
  var crossSlopeOK = ( votingAreaData.qid_7.answer === 'Yes' ) ? true : false;
  var slopeChangesBeveled = ( votingAreaData.qid_8.answer === 'Yes' ) ? true : false;
  var levelChangesSloped = ( votingAreaData.qid_9.answer === 'Yes' ) ? true : false;

  if ( ! stablePath ) {
    response.warnings.add ('Path of travel within the voting area may be slippery/unstable.');
  }

  if ( ! protusionsLT4in || ! protusionsLT12in ) {
    response.warnings.add( 'Take care of obstacles in the walkway.' );
  }

  if ( ! overheadObstaclesBarred ) {
    response.warnings.add( 'Take care of overhead obstacles.' );
  }

  if ( ! wheelchairSpace ) {
    response.warnings.add( 'Turning a wheelchair may be difficult in the voting area.' );
  }

  if ( ! easyEmergencyExit ) {
    response.warnings.add( 'Emergency exits may require grasping to open.' );
  }

  if ( ! crossSlopeOK || ! slopeChangesBeveled || ! levelChangesSloped ) {
    response.warnings.add( 'There may be unbeveled or highly sloped changes in the floor level.' );
  }

  if ( response.warnings.size > 0 ) {
    response.summary = 'The voting area has some accessibility concerns:';
  } else {
    response.summary = 'The voting area is fully accessible for all.';
  }

  response.warnings = Array.from(response.warnings);
  return response;
};

module.exports = votingArea;
