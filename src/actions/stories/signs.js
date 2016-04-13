var and = require('join-component');

var signs = function(pollingPlace) {
  var response = { summary: 'Signs next to permanent rooms do not have raised Braille characters.', warnings: [] };
  var sign = pollingPlace.Signage.root;
  
  if (sign.qid_1.answer === 'Yes') response.summary = 'Signs next to permanent rooms have raised Braille characters.';
  if (sign.qid_1.answer === 'No' && sign.qid_1.data === 'No Signs') response.summary = 'There are no signs next to permanent rooms.';
  
  if (sign.qid_2.answer === 'No') response.warnings.push('Signs next to rooms might not be placed near the door.');
  
  if (sign.qid_3.answer === 'No') response.warnings.push('Signs next to rooms might be lower than 3 feet off the floor.');
  
  if (sign.qid_4.answer === 'No') response.warnings.push('Signs next to rooms might be higher than 5 feet off the floor.');
  
  if (sign.qid_5.answer === 'No') response.warnings.push('Beware bumping into or protruding objects or swinging doors near wall-mounted signs.');
  
  if (sign.qid_8.answer === 'No') response.warnings.push('Facilities intended for elderly voters and people with disabilities may not be marked with ISA signs.');
  
  return response;
};

module.exports = signs;
