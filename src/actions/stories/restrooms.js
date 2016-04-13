var and = require('join-component');

var restrooms = function(pollingPlace) {
  var response = { summary: 'There are no restrooms.', warnings: [] };
  var availableRestrooms = [];
  var unavailableRestrooms = [];
  if (pollingPlace.Restrooms["1a-Men's-Restroom"].qid_1.answer != 'N/A'
    || !pollingPlace.Restrooms["1a-Men's-Restroom"].qid_1.answer != 'N/A') {
    var hasMensRestroom = true;
    availableRestrooms.push("men's");
  } else {
    unavailableRestrooms.push("men's");
  }
  if (pollingPlace.Restrooms["1a-Women's-Restroom"].qid_1.answer != 'N/A'
    || !pollingPlace.Restrooms["1a-Women's-Restroom"].qid_1.answer) {
    var hasWomensRestroom = true;
    availableRestrooms.push("women's");
  } else {
    unavailableRestrooms.push("women's");
  }
  if (pollingPlace.Restrooms['1a-Unisex-Restroom'].qid_1.answer != 'N/A'
    || !pollingPlace.Restrooms['1a-Unisex-Restroom'].qid_1.answer) {
    var hasUnisexRestroom = true;
    availableRestrooms.push('unisex');
  } else {
    unavailableRestrooms.push('unisex');
  }
  
  if (availableRestrooms.length > 0) {
    response.summary = `There are ${and(availableRestrooms)} restrooms available`;
    if (unavailableRestrooms.length > 0) {
      response.summary += `, but no ${and(unavailableRestrooms)} restrooms`
    }
    response.summary += '.';
  }
  
  return response;
};

module.exports = restrooms;
