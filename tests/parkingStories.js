import test from 'tape'
import access from '../src/actions/fetchAccessibilityObject.js'
import parking from '../src/actions/stories/parking.js'

test('Parking stories', function(t){
  t.plan(4);
  access(2135)
  .then(function(res){
    var story = parking(res['2135']);
    t.comment(JSON.stringify(story));
    t.equals(story.summary, 'There is a parking lot with safe and handicap-accessible van and car parking.', 'Correct parking summary for ppid 2135');
    t.ok(story.warnings.indexOf('Beware wheeling or walking behind other parked cars.') >= 0, 'Expected parking warning for ppid 2135');
    t.equals(story.warnings.length, 1, 'Expects only 1 parking warning for ppid 2135');
  })
  access(3414)
  .then(function(res){
    var story = parking(res[3414]);
    t.comment(JSON.stringify(story));
    t.ok(story);
  });
});
