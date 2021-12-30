import { Rensa } from "https://RensaData.github.io/Rensa-es/Rensa.js";
import { RensaIMI } from "https://RensaData.github.io/imi/RensaIMI.js";
import Ed25519 from "https://taisukef.github.io/forge-es/lib/ed25519.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

const keyfn = Deno.args[0];
const url = Deno.args[1];
if (!url) {
  console.log("[filename of key.cbor] [url]");
  Deno.exit(1);
}

const keypair = CBOR.decode(await Deno.readFile(keyfn));
//console.log(keypair);

const trx = new Rensa((signData) => {
  const sig = Ed25519.sign({
    privateKey: keypair[RensaIMI.privateKey.url],
    message: signData,
    encoding: "binary"
  });
  return [keypair[RensaIMI.publicKey.url], sig];
});
trx.addAndSign(Rensa.KIND_ROOT, { "https://schema.org/url": url });
console.log("verify:", trx.verify());
const bin = trx.toCBOR();
await Deno.writeFile("link.rensa", bin);
