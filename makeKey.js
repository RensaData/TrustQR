import Ed25519 from "https://taisukef.github.io/forge-es/lib/ed25519.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";
import { RensaIMI } from "https://RensaData.github.io/imi/RensaIMI.js";

const keys = Ed25519.generateKeyPair();
//console.log(keys);

const secretKey = {};
secretKey[RensaIMI.privateKey.url] = keys.privateKey;
secretKey[RensaIMI.publicKey.url] = keys.publicKey;
const secretbin = CBOR.encode(secretKey);
await Deno.writeFile("key.cbor", secretbin);
await Deno.chmod("key.cbor", 0o600);
console.log("make key.cbor", secretbin.length, "byte");

// future: print to stdout and develop command to readback 
const publicKey = {};
publicKey[RensaIMI.publicKey.url] = keys.publicKey;
const publicbin = CBOR.encode(publicKey);
await Deno.writeFile("pubkey.cbor", publicbin);
console.log("make pubkey.cbor", publicbin.length, "byte");
