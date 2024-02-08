const {createDiffieHellman} = require("./browser");
const crypto = require("crypto");

const alice = createDiffieHellman(127);
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

console.log("Alice prime (p):", alice.getPrime().toString("hex"), "\nAlice generator (G):", alice.getGenerator().toString("hex"));
console.log("aliceKey", aliceKey.toString("hex"));
console.log("alicesecret", aliceSecret.toString("hex"));
console.log("Bob prime (p):", bob.getPrime().toString("hex"), "\nBob generator (G):", bob.getGenerator().toString("hex"));
console.log("bobKey", bobKey.toString("hex"));
console.log("bobsecret", bobSecret.toString("hex"));

var secret_key = aliceSecret;
var secret_iv = "smslt";
var encryptionMethod = "AES-256-CBC";
var key = crypto.createHash("sha512").update(secret_key, "utf-8").digest("hex").substr(0, 32);
var iv = crypto.createHash("sha512").update(secret_iv, "utf-8").digest("hex").substr(0, 16);
var encryptedMessage = encrypt_string("hello", encryptionMethod, key, iv);
console.log(encryptedMessage, "encryptedMessage"); // output : L2dOZjlDVmxoSDNWdmpVMkNGd0JEdz09
var decrptMessage = decrypt_string(encryptedMessage, encryptionMethod, key, iv);
console.log(decrptMessage, "output (decrypted message)"); //output : hello

// console.log(decrypted, "decrypted message");

function encrypt_string(plain_text, encryptionMethod, secret, iv) {
  var encryptor = crypto.createCipheriv(encryptionMethod, secret, iv);
  var aes_encrypted = encryptor.update(plain_text, "utf8", "base64") + encryptor.final("base64");
  return Buffer.from(aes_encrypted).toString("base64");
}
function decrypt_string(encryptedMessage, encryptionMethod, secret, iv) {
  const buff = Buffer.from(encryptedMessage, "base64");
  encryptedMessage = buff.toString("utf-8");
  var decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
  return decryptor.update(encryptedMessage, "base64", "utf8") + decryptor.final("utf8");
}
