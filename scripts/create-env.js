// fs is a node module which connects us with the OS to send and receive data
// a kind of API kernel 
const fs = require('fs')

fs.writeFileSync('./.env', `API=${process.env.API}\n`)