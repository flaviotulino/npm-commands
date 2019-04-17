const npm = require('./npm-commands');
npm().arguments({test: [1, 2]}).run('test');
npm().run('test');