const path = require('path')
const { spawn } = require('child_process')
const config = require('./config');
const nwjs = require('nw');
const process = require('process');
const figlet = require('figlet');

function findPath() {
  let findpath = nwjs.findpath;
  let nwpath = nwjs.findpath();
  return nwpath;
}

let nwProcess = {
  firstStart: true,
  run: false,
  update: false
};

let MainConfig = {
  mainProcess: null
}

function launchNW (opts) {
  mainProcess = Object.assign({}, MainConfig, opts);
}

function runNW () {
  //Set run, for not reopen nwjs
  nwProcess.run = true;
  console.log('\n Starting NW.js...');
  let nwPath = findPath();
  let pathProject = `http://${config.dev.host}:${config.dev.port}`;
  setTimeout(() => {
    let nwProcess = spawn(nwPath, ['.'].concat( process.argv.slice(2) ), {
        cwd: path.resolve(__dirname, '../')
     });
  //  nwProcess.stdout.setEncoding('utf8');
    nwProcess.stdout.on('data', (data) => {
      const msg = data.toString('utf-8');
      console.log(msg);
    });

    nwProcess.stderr.on('data', (data) => {
      const msg = data.toString('utf-8');
      console.log(msg);
    });

    nwProcess.stderr.on('close', () => {
      console.log('\n NW.js has ben closed');
      closeNW();
    });  

    nwProcess.stderr.on('exit', () => {
      console.log('\n NW.js has ben closed');
      closeNW();
    });
  }, 3000);
}

function closeNW () {
  console.log('\n NW.js closed, stoping server.');
  this.process.exit();
}

function showLogo () {
  let opts = {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  };
  
  figlet('NW.js with Vue.js', opts ,function(err, data) {
    if (err) {
        console.dir(err);
        return;
    }
    console.log('\n ');
    console.log(data)
    console.log('\n ');
    
    figlet('By Patrick A Lima \n', {font: 'Italic'} ,function(err, data) {
      if (err) {
          console.dir(err);
          return;
      }
      console.log(data)
    });
  }); 

}

launchNW.prototype.apply = function (compiler) {
  compiler.plugin('done', function () {
    if (nwProcess.firstStart === true && nwProcess.run === false) {
      runNW();
    }
  });
  compiler.plugin('emit', function (compilation, callback) {
    showLogo();
    callback();
  });
}

module.exports = launchNW;