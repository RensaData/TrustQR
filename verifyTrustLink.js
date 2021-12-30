import { Rensa } from "https://RensaData.github.io/Rensa-es/Rensa.js";
import { RensaIMI } from "https://RensaData.github.io/imi/RensaIMI.js";
import { hex } from "https://code4sabae.github.io/js/hex.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

const datafn = Deno.args[0];
const pubkeyfn = Deno.args[1];
if (!datafn || !pubkeyfn) {
  console.log("[rensa filename of TrustLink] [filename of pubkey.cobr]");
  Deno.exit(1);
}

const pubkey = hex.fromBin(CBOR.decode(await Deno.readFile(pubkeyfn))[RensaIMI.publicKey.url]);
const rensa = Rensa.fromCBOR(await Deno.readFile(datafn));

const link = rensa.playback((err, timestamp, publicKey, msg, obj) => {
  if (err) {
    console.log("err!");
    return false;
  }
  const pkey = hex.fromBin(publicKey);
  if (pkey != pubkey) {
    console.log("unknown pubkey!!", pkey, pubkey);
    return false;
  }
  console.log({ timestamp, pkey, msg, obj });
  return false;
});

console.log(link);
