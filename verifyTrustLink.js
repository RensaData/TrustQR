import { TrustLink } from "./TrustLink.js";
import { CBOR } from "https://js.sabae.cc/CBOR.js";

const datafn = Deno.args[0];
const pubkeyfn = Deno.args[1];
if (!datafn || !pubkeyfn) {
  console.log("[rensa filename of TrustLink] [filename of pubkey.cobr]");
  Deno.exit(1);
}

const pubkey = CBOR.decode(await Deno.readFile(pubkeyfn))
const cbor = await Deno.readFile(datafn);

const link = TrustLink.decode(cbor, pubkey);
console.log(link);

