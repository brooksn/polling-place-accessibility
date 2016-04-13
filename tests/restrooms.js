import test from 'tape'
import access from '../src/actions/fetchAccessibilityObject.js'
import restrooms from '../src/actions/stories/restrooms.js'

test('Restroom stories', function(t){
  t.plan(2);
  access(15)
  .then(function(res){
    var story = restrooms(res['15']);
    t.equals(story.summary, "There are men's, women's and unisex restrooms available.", 'Correct restrooms summary for ppid 15');
    t.equals(story.warnings.length, 0, 'Expects no restrooms warnings for ppid 15');
  })
});
