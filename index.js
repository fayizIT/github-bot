const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

import('random').then(randomModule => {
  const random = randomModule.default;

  const makeCommit = n => {
    if (n === 0) {
      return simpleGit().push();
    }
  
    const x = random.int(0, 54);
    const y = random.int(0, 6);
  
    const DATE = moment()
      .subtract(1, 'y')
      .add(x, 'w')
      .add(y, 'd')
      .format();
  
    const data = {
      date: DATE
    };
  
    console.log(DATE);
  
    jsonfile.writeFile(FILE_PATH, data, () => {
      simpleGit()
        .add([FILE_PATH])
        .commit(DATE, {'--date': DATE}, makeCommit.bind(this, n - 1));
    });
  };
  
  makeCommit(100);
}).catch(error => {
  console.error('Error importing random module:', error);
});
