const http = require('http');
const options = {
    host: '0.0.0.0',
    port: 80,
    path: '/healthcheck',
    timeout: 2000
};

const healthCheck = http.request(options, (res) => {
    if (res.statusCode === 200) {
        process.exit(0);
    }
    process.exit(1);
});

healthCheck.on('error', function (err) {
    console.error('ERROR');
    process.exit(1);
});

healthCheck.end();