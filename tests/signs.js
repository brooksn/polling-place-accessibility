import test from 'tape'
import access from '../src/actions/fetchAccessibilityObject.js'
import signs from '../src/actions/stories/signs.js'

test('Signage stories', function(t){
  t.plan(2);
  access(15)
  .then(function(res){
    let story = signs(res['15']);
    t.equals(story.summary, 'There are no signs next to permanent rooms.');
    t.equals(story.warnings.length, 0, 'Expects no signage warnings for ppid 15');
  });
});
