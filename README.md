# npm-commands
Execute npm commands programmatically in your Node scripts!

### Motivation
How many times did you have to execute some npm commands in your Node scripts?
I had. A lot.

### What you can do 
With this library you can execute, both synchronously and asynchronously: 
- `npm run <script>`
- `npm install`
- `npm install <module>`
- `npm link`
- `npm link <module>`
 
### Examples
Let's assume you've got some scripts in you `package.json`:
```javascript
"scripts": {
    "build": "node ./scripts/build.js",
    "release": "node ./scripts/release.js",
    "deploy": "node ./scripts/deploy.js"
}
```
and let's say you need to build and release when you deploy. 

For sure you could chain the two scripts and do something like
```javascript
"scripts": {
    "deploy": "npm run build && npm run release"    
}
```

That's ok, but you can have some issues because of the different plaforms (Linux, MacOs and Windows) and maybe you have to perform some stuff before you actually deploy; therefore you created your deploy script. 

Your deploy script could look like

```javascript
/* do some stuff
... your fancy code here ../
*/

// we need to run our script, so we need to run a new process
const { execSync } = require('child_process');

// in case you have no params to pass through
execSync('npm run build', { stdio: 'inherit', cwd: 'path/to/dir' });

// but in case you have to also pass some arguments, you would need to change the above into this
const params = process.argv.slice(2);
execSync(`npm run build -- ${params}`, { stdio: 'inherit', cwd: 'path/to/dir' });

/* the rest of your code here */
```

Pretty ugly isn't it?

Using this library you would do
```javascript
/* do some stuff
... your fancy code here ../
*/

// we need to run our script, so we need to run a new process
const npm = require('npm-commands');

// arguments are passed through by default
npm().run('build');

// but in case you don't want to pass arguments
npm().arguments(false).run('build')
/* the rest of your code here */
```

### Examples
#### Changing the working director
```javascript
npm().cwd('path/to/').run('build');

// install the dependencies from the specified folder 
npm().cwd('path/to/').install();

// install react in the specified folder
npm().cwd('path/to/').install('react');
```

#### Suppress the output
```javascript
// this will show the output in the console
npm().run('build');

// this too
npm().output(true).run('build');

// this won't 
npm().output(false).run('build');
```

#### Provide arguments
```javascript
/* 
 * assuming you have run 
 * $ node scripts/build.js --mode prod
 * this will pass the mode to your script automatically
*/
npm().run('build')

// this will ignore the cli arguments
npm().arguments(false).run('build')

// this will pass specific ones
npm().arguments({ mode: 'dev', runTests: false }).run('build');
```

> `.run`, `.install` and `.link` have also an async version that returns a Promise.

```javascript
npm().runAsync('build').then(output => {
  // do something with the output  
});

npm().installAsync('react').then(output => {
  // do something with the output  
});
```

#### :class
| Method | Description | Params | Returns |
| ------ | ----------- | ------ | ------- |
| `cwd`  | Changes the working director | directory: `<String>` | `instance` | 
| `output` | Sets whether to show the command output | value: `<Boolean>` | `instance` |
| `arguments` | Remaps the CLI arguments | args: `<Object>` | `instance` |
| `install` | Runs a `npm install` | module: `<?String>` | output: `<String>` |

### TODO 
- tests
- potentially cover other commands
