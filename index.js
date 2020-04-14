const {execSync, exec} = require('child_process');

class npm {
  constructor() {
    this.options = {
      stdio: 'inherit'
    };
    this.args = process.argv.slice(2);
  }

  cwd(dir) {
    this.options.cwd = dir;
    return this;
  }

  output(value = true) {
    this.options.stdio = value ? 'inherit': 'ignore';
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
          if (Array.isArray(args[key])) {
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
  install(module = '', { save, saveDev } = {}) {
    let saveMode = '';
    if (save) {
      saveMode = '--save'
    } else if(saveDev) {
      saveMode = '--save-dev'
    }

    try {
      return execSync(`npm install ${module} ${saveMode}`, this.options).toString();
    } catch (e) {
      return null;
      
    }
  }

  installAsync(module = '', { save, saveDev } = {}) {
    let saveMode = '';
    if (save) {
      saveMode = '--save'
    } else if(saveDev) {
      saveMode = '--save-dev'
    }

    return new Promise((resolve, reject) => {
      try {
        exec(`npm install ${module} ${saveMode}`, this.options, (error, output) => {
          if (error) {
            throw error;
          }
          return resolve(output);
        });
      } catch (e) {
        return reject(null);
      }
    });
  }

  link(module = '') {
    try {
      return execSync(`npm link ${module}`, this.options).toString();
    } catch (e) {
      return null;
    }
  }

  linkAsync(module = '') {
    return new Promise((resolve, reject) => {
      try {
        exec(`npm link ${module}`, this.options, (error, output) => {
          if (error) {
            throw error;
          }
          return resolve(output);
        })
      } catch (e) {
        reject(null);
      }
    });
  }

  unlink(module = '') {
    try {
      return execSync(`npm unlink ${module}`, this.options).toString();
    } catch (e) {
      return null;
    }
  }

  unlinkAsync(module = '') {
    return new Promise((resolve, reject) => {
      try {
        exec(`npm unlink ${module}`, this.options, (error, output) => {
          if (error) {
            throw error;
          }
          return resolve(output);
        })
      } catch (e) {
        reject(null);
      }
    });
  }

  run(script) {
    const args = this.args ? `-- ${this.args.join(' ')}` : '';
    try {
      return execSync(`npm run ${script} ${args}`, this.options).toString();
    } catch (e) {
      return null;
    }
  }

  runAsync(script) {
    const args = this.args ? `-- ${this.args.join(' ')}` : '';
    return new Promise((resolve, reject) => {
      try {
        exec(`npm run ${script} ${args}`, this.options, (error, output) => {
          if (error) {
            throw error;
          }

          return resolve(output)
        });
      } catch (e) {
        return reject(null);
      }
    });
  }
}

module.exports = () => new npm();
