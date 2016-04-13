var and = require('join-component');

var paths = function(pollingPlace) {
  var response = { summary: 'There are no surveyed paths.', warnings: [] };
  for (var subcat in pollingPlace['Path of Travel']) {
    var sub = pollingPlace['Path of Travel'][subcat];
    pollingPlace['Path of Travel'][subcat.replace(/^\d+-/gi, "")] = sub;
  }
  
  var parking = pollingPlace['Path of Travel']['Parking'];
  var pubTransit = pollingPlace['Path of Travel']['Public-Transportation'];
  var dropOff = pollingPlace['Path of Travel']['Drop-Off-Zone'];
  var propertyLine = pollingPlace['Path of Travel']['Property-Line'];
  var other = pollingPlace['Path of Travel']['Other'];
  var subCategories = [parking, pubTransit, dropOff, propertyLine, other];
  var andPaths = [];
  var noPaths = true;
  var pathsWithSteps = [];
  
  subCategories.forEach( (val) => {
    if (val.qid_0.answer) andPaths.push('a path ' + val.qid_0.answer);
  });
  
  if (andPaths.length > 0) {
    noPaths = false;
    response.summary = 'There is ' + and(andPaths) + '.';
  }
  
  //Steps warnings
  subCategories.forEach( (sub) => {
    if (sub.qid_1.answer === 'No' && sub.qid_2.answer !== 'Yes') pathsWithSteps.push('the path ' + sub.qid_0.answer);
  });
  if (pathsWithSteps.length > 0) response.warnings.push('There are stairs on ' + and(pathsWithSteps) + '.');
  
  //Warnings which only mention a single path, e.g. 'from Parking', and should be ordered by path.
  subCategories.forEach( (sub) => {
    let pathFrom = sub.qid_0.answer;
    //Missing directional signs
    if (sub.qid_12.answer === 'No') response.warnings.push(`The accessible route ${fromPath} is not the regular pedestrian route, but directional signs are not visible.`);
    
    //Missing ISA sign
    if (sub.qid_3.answer === 'Yes') response.warnings.push(`The alternate accessible path ${pathFrom} is not marked by an ISA sign.`);
    
    //Narrow path
    let narrowPathWidth = sub.qid_4.data ? ` (only ${sub.qid_4.data.replace('"', ' inches')})` : '';
    if (sub.qid_4.answer === 'No') response.warnings.push(`The path ${pathFrom} is narrow${narrowPathWidth}.`);
    
    //Slippery path
    if (sub.qid_5.answer === 'No') response.warnings.push(`The path ${pathFrom} is slippery or unstable.`);
    
    //Steep ramp
    if (sub.qid_6.answer === 'No' || sub.qid_7.answer === 'No' || sub.qid_8.answer === 'No') {
      response.warnings.push(`The path ${pathFrom} has a steep ramp.`);
    }
    
    //Wide grates
    if (sub.qid_9.answer === 'No') response.warnings.push(`The path ${pathFrom} follows a grate with spaces greater than ͑½ inch wide, where wheels may get stuck.`);
    
    //Overhead obstacles (sight-impairment)
    if (sub.qid_10.answer === 'No') response.warnings.push(`The path ${pathFrom} has overhead obstacles that cannot be detected with a cane.`);
    
    //Wall-mounted protrusions
    if (sub.qid_11.answer === 'No') response.warnings.push(`The path ${pathFrom} has wall-mounted protrusions greater than 4 inches.`);
  });
  
  return response;
};

module.exports = paths;
