Using the R,S and Z values to decode private key bitcoin.






Converting HEX
https://www.rapidtables.com/convert/number/decimal-to-hex.html



Bitcoin Address from Private Key Hex

http://web.archive.org/web/20191129190724/https://2coin.org/privateKeyToAddress.html





Function cocalc
https://cocalc.com/


p  = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
r  = 0x4565930ed2f8acc0f4e0bb0bc2320330e8c4a4e277a1baba9fcfb69173b5702c
s1 = 0x5ba7256c5d524cebf12e0069ca4b9c7f9c6038fa20c3e77cae1ca911f780ae0b
s2 = 0x00d06a9a4942e26d66e307461406b863e5421f1db3a9dbd2cd0f56cd78af3c5d
z1 = 0xa1917654dda8d075603bba96d9ecb4dbd5c2dee70d4cd7bcc6ade78d447dd884
z2 = 0x628460c06d2ecaefff212565a53ec780c0b08319e79b6ab9eea0818f724fddc7

K = GF(p)

K((z1*s2 - z2*s1)/(r*(s1-s2)))
