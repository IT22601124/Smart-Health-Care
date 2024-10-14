const server1 = require('./server');
const server2 = require('./server1');
// Start server1 on port 3001
server1.listen(3000, () => {
console.log('Server 1 is running on port 3001');
});

// Start server2 on port 3002
server2.listen(3001, () => {
console.log('Server 2 is running on port 3002');
});
