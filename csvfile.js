var fs = require('fs');
var parse = require('csv-parse');
var list;
fs.readFile('./src/data/VREData.csv', 'utf-8', (err, output) => {
  if (err) throw err;
  parse(output, {columns: true}, (err, response) => {
    list = response;
    console.log(list);
    fs.writeFile(`./vredataset.json`, list, (err) => {
      if (err) throw err;
      console.log(`complete`);
    })
  });
});
