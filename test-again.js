const {createDiffieHellman} = require("node:crypto");

// Generate Alice's keys...
const alice = createDiffieHellman(512);
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// Prints prime and generator for
// Alice with encoding
console.log("Alice prime (p):", alice.getPrime().toString("hex"), "\nAlice generator (G):", alice.getGenerator().toString("hex"));
console.log("aliceKey", aliceKey.toString("hex"));
console.log("alicesecret", aliceSecret.toString("hex"));
console.log("Bob prime (p):", bob.getPrime().toString("hex"), "\nBob generator (G):", bob.getGenerator().toString("hex"));
console.log("bobKey", bobKey.toString("hex"));
console.log("bobsecret", bobSecret.toString("hex"));
