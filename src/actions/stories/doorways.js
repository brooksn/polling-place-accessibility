var and = require('join-component');

var doorways = function(pollingPlace) {

  var site = pollingPlace;
  var doorwaysData = site['1. Doorways'].root;
  var response = { summary: 'No doorways.', warnings: [] };

  if ( doorwaysData.qid_0.answer < 1 ) { return response; }

  if (   doorwaysData.qid_1.answer === 'No' || doorwaysData.qid_2.answer === 'No'
      || doorwaysData.qid_9.answer === 'No' ) {
    response.warnings.push('Some doorways may be narrow (less than 32").');
  }

  if ( doorwaysData.qid_3.answer === 'No' || doorwaysData.qid_4.answer === 'No' ) {
    response.warnings.push('Watch for high thresholds in doorways.');
  }

  if ( doorwaysData.qid_5.answer === 'No' ) {
    response.warnings.push('Door handles may require twisting, pinching, or grasping actions.');
  }

  if ( doorwaysData.qid_6.answer === 'No' ) {
    response.warnings.push('Door handles may be higher than normal.');
  }

  if ( doorwaysData.qid_7.answer === 'No' ) {
    response.warnings.push('Doorways may not have a smooth pushing surface.');
  }

  if ( doorwaysData.qid_8.answer === 'No' ) {
    response.warnings.push('Closed doors may be heavy (Door should be propped open on election day).');
  }

  if (   doorwaysData.qid_10.answer === 'No' || doorwaysData.qid_12.answer === 'No' 
      || ( doorwaysData.qid_14 !== undefined  && doorwaysData.qid_14.answer  === 'No' )
      || doorwaysData.qid_13.answer === 'No' ) {
    response.warnings.push('Take care for uneven or crowded spaces around the doorways');
  }

  if ( doorwaysData.qid_11.answer === 'No' || ( doorwaysData.qid_15 !== undefined  
                                               && doorwaysData.qid_15.answer  === 'No' ) ) {
    response.warnings.push('Narrow strike space in doorways.');
  }

  if ( response.warnings.length > 0 ) {
    response.summary = 'Some accessibility concerns with the doorways: ';
  } else {
    response.summary = 'Doorways are accessible to all.';
  }

  return response;
};

module.exports = doorways;
