// This will be require('npm-commands')
const npm = require('./index');

// Run a custom script defined in the package.json
npm().run('fancy-script');
// output: npm run fancy-script

/* If you run your node script within some arguments, those
 * will be automatically passed to the process you're invoking
 * i.e node ./this-script.js --arg1 1 --arg2 2
 */ 
npm().run('fancy-script');
// output: npm run fancy-script --arg1 1 --arg2 2

/* If you don't want to pass any params
 * i.e node ./this-script.js --arg1 1 --arg2 2
 */
npm().arguments(false).run('fancy-script');
// output: npm run fancy-script

/* You can also pass some arguments runtime
 * i.e node ./this-script.js
 *
 * Note if you pass the arguments here, you will loose the ones 
 * passed via the CLI.
 * You will have to manually merge them if you need
 */
npm().arguments({ arg5: true, arg50: 'argument'}).run('fancy-script') 
// output: npm run fancy-script --arg5 true --arg50 argument

/* All the commands above can be prepended with 
 * cwd(directory) and output(true|false) */
npm().cwd('path/to/another/directory').run('fancy-script')
// This will run from another directory  

npm().arguments({ arg5: true, arg50: 'argument'}).output(false).run('fancy-script') 
// This will not show any output

/* A part from run, you can use install and link */
