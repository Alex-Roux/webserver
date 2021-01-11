var forever = require('forever-monitor');

var child = new (forever.Monitor)('app.js', {
    max: 3,
    silent: true,
    args: []
});

child.on('exit', function () {
    console.log('Error');
});

child.start();