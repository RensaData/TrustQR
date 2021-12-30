import { Rensa } from "https://RensaData.github.io/Rensa-es/Rensa.js";
import { hex } from "https://code4sabae.github.io/js/hex.js";

const datafn = Deno.args[0];
if (!datafn) {
  console.log("[rensa filename of TrustLink]");
  Deno.exit(1);
}

const org = await Deno.readFile(datafn);

const rensa = Rensa.fromCBOR(org);

console.log(rensa);
console.log(rensa.toString());
rensa.playback((err, timestamp, publicKey, msg, obj) => {
  if (err) {
    return false;
  }
  const pkey = hex.fromBin(publicKey);
  console.log({ timestamp, pkey, msg, obj });
  return false;
});

for (let j = 0; j < org.length; j++) {
  const bin2 = new Uint8Array(org.length);
  for (let i = 0; i < org.length; i++) {
    bin2[i] = org[i];
  }
  bin2[j]++;
  try {
    const rensa = Rensa.fromCBOR(bin2);
    if (rensa) {
      throw new Error("!!");
    }
    console.log(j, "can't verify");
  } catch (e) {
    console.log(j, "can't decode");
  }
}
console.log("check complete");
