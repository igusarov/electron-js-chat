const net = require('net');
const port = 3000;
const client = new net.Socket();
let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
    client.end();
    if(!startedElectron) {
      console.log('starting electron');
      startedElectron = true;
      const exec = require('child_process').exec;
      exec('electron .');
    }
  }
);
tryConnection();
client.on('error', (error) => {
  setTimeout(tryConnection, 1000);
});
