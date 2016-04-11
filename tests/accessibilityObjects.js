import test from 'tape'
import has from 'lodash.has'
import access from '../src/actions/fetchAccessibilityObject.js'

test('Fetch valid accessibility data', function(t){
  t.plan(3);
  access(9999)
  .catch(function(err){
    t.ok(err, 'Expect non-existant ppid to be rejected.');
  })
  access(2135).then(function(res){
    t.ok(has(res, `2135[Parking Area].root.qid_12`), 'Expect parking question twelve.');
    t.notOk(has(res['2135'], null), 'No null sections.');
  })
});
