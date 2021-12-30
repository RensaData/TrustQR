# TrustQR
 
認証済みリンク TrustLink と、認証済みリンクのQRコード TrustQR

## demo

- [TrustQR Reader](https://rensadata.github.io/TrustQR/)
- [TrustQR sample](https://rensadata.github.io/TrustQR/link.html)

## how to use

make keypair (key.cbor, pubkey.cobr)
```
deno run -A makeKeys.js
```

make TrustLink with key.cbor and url
```
deno run -A makeTrustLink.js key.cbor https://github.com/RensaData/
```

verify TrustLink with pubkey.cbor
```
deno run -A verifyTrustLink.js link.rensa pubkey.cbor
```
