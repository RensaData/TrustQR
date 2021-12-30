import { Rensa } from "https://RensaData.github.io/Rensa-es/Rensa.js";
import { RensaIMI } from "https://RensaData.github.io/imi/RensaIMI.js";
import { hex } from "https://code4sabae.github.io/js/hex.js";

class TrustLink extends Rensa {
  constructor(signfunc) {
    super(signfunc);
  }
  addAndSignLink(url) {
    super.addAndSign(Rensa.KIND_ROOT, { "https://schema.org/url": url });
  }
  static decode(cbor, pubkey) {
    const hexpubkey = hex.fromBin(pubkey[RensaIMI.publicKey.url]);
    try {
      const rensa = Rensa.fromCBOR(cbor);
      const link = rensa.playback((err, timestamp, publicKey, msg, obj) => {
        if (err) {
          throw new Error("broken!");
        }
        const pkey = hex.fromBin(publicKey);
        if (pkey != hexpubkey) {
          throw new Error("unknown pubkey!! " + pkey);
        }
        //console.log({ timestamp, pkey, msg, obj });
        return true;
      });
      return link;
    } catch (e) {
      console.log("err", e);
    }
    return null;
  }
};

export { TrustLink };
