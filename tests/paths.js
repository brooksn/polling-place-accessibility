import test from 'tape'
import access from '../src/actions/fetchAccessibilityObject.js'
import paths from '../src/actions/stories/paths.js'

test('Path stories', function(t){
  t.plan(4);
  access(15)
  .then(function(res){
    let story = paths(res['15']);
    t.equals(story.summary, 'There is a path from Parking and a path from Property line.', 'Correct paths summary for ppid 15');
    t.equals(story.warnings.length, 4, 'Expects no paths warnings for ppid 15');
  })
  access(3120)
  .then(function(res){
    let story = paths(res['3120']);
    t.equals(story.summary, 'There is a path from Parking and a path from Public Transportation.', 'Correct paths summary for ppid 3120');
    t.equals(story.warnings.length, 3, 'Expects one path warning for ppid 3120');
  })
});
