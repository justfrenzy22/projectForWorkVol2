

const crypto = require('crypto');
const fs = require('fs');

const options = {
    days: 365,
    selfSigned: true
}

const pems = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
}, options);

fs.writeFileSync('key.pem', pems.privateKey);
fs.writeFileSync('cert.pem', pems.publicKey);

console.log('Self-signed certificate created!');

