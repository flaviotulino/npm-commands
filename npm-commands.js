const { execSync } = require('child_process');

class npm {
  constructor() {
    this.options = {
      stdio: 'inherit'
    }
    this.args = process.argv.slice(2);
  }
  cwd(dir) {
    this.optinos.cwd = dir;
    return this;
  }
  output(value = true) {
    this.options.stdio = value ? 'inherit' : 'ignore';
    return this;
  }
  arguments(args = {}) { 
    if (args === false) {
      this.args = [];
      return this;
    }
    
    const string = [];
    
    Object.keys(args)
      // in case of yargs
      .filter(key => key !== '$0' && key !== '_')
      .forEach(key => {
        if(Array.isArray(args[key])) {
          args[key].forEach(value => {
            string.push(`--${key} ${value}`);
          })
        } else {
          string.push(`--${key} ${args[key]}`);
        }
      });
    
    this.args = string;
    return this;
  }
  /**
  * @executes a npm install, of only one dependency if specified
  */
  install(module = null) {
    try {
      return execSync(`npm install ${module}`, this.options);
    } catch (e) {
      return null;
    }
  }
  link(module = null) {
    try {
      return execSync(`npm link ${module}`, this.options);
    } catch (e) {
      return null;
    }
  }
  run(script) {
    const args = this.args ? `-- ${this.args.join(' ')}` : '';
    try {
      return execSync(`npm run ${script} ${args}`, this.options);
    } catch (e) {
      return null;
    }
  }
}

module.exports = () => new npm();