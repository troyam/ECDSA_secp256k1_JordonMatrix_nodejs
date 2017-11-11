var BN = require("big-integer");

var jordan_isinf = function (p) {
    return p[0][0].eq(0) && p[1][0].eq(0);
}

var mulcoords = function (c1, c2) {
    return [c1[0].multiply(c2[0]).mod(P), c1[1].multiply(c2[1]).mod(P)];
}

var mul_by_const = function (c, v) {
    return [c[0].multiply(v).mod(P), c[1]];
}

var addcoords = function (c1, c2) {
    return [c1[0].multiply(c2[1]).add(c2[0].multiply(c1[1])).mod(P), c1[1].multiply(c2[1]).mod(P)];
}

var subcoords = function (c1, c2) {
    var aa = c1[0].multiply(c2[1]).mod(P);
    var bb = c2[0].multiply(c1[1]).mod(P);
    var cc = aa.subtract(bb).add(P).mod(P);
    return [cc.mod(P), c1[1].multiply(c2[1]).mod(P)];
}

var invcoords = function (c) {
    return [c[1], c[0]];
}

var jordan_add = function (a, b) {
    if (jordan_isinf(a)) return b;
    if (jordan_isinf(b)) return a;

    if (a[0][0].multiply(b[0][1]).subtract(b[0][0].multiply(a[0][1])).mod(P).eq(0)) {
        if (a[1][0].multiply(b[1][1]).subtract(b[1][0].multiply(a[1][1])).mod(P).eq(0)) {
            return jordan_double(a);
        } else {
            return [[ZERO, ONE], [ZERO, ONE]];
        }
    }
    var xdiff = subcoords(b[0], a[0]);
    var ydiff = subcoords(b[1], a[1]);
    var m = mulcoords(ydiff, invcoords(xdiff));
    var x = subcoords(subcoords(mulcoords(m, m), a[0]), b[0]);
    var y = subcoords(mulcoords(m, subcoords(a[0], x)), a[1]);
    return [x, y]
}

var jordan_double = function (a) {
    if (jordan_isinf(a)) {
        return [[ZERO, ONE], [ZERO, ONE]];
    }
    var num = addcoords(mul_by_const(mulcoords(a[0], a[0]), THREE), [ZERO, ONE]);
    var den = mul_by_const(a[1], TWO);
    var m = mulcoords(num, invcoords(den));
    var x = subcoords(mulcoords(m, m), mul_by_const(a[0], TWO));
    var y = subcoords(mulcoords(m, subcoords(a[0], x)), a[1]);
    return [x, y]
}

var jordan_multiply = function (a, n) {
    if (jordan_isinf(a) || n.eq(0)) {
        return ([ZERO, ZERO], [ZERO, ZERO]);
    }
    if (n.eq(1)) {
        return a;
    }
    if (n.lt(0) || n.geq(N)) {
        return jordan_multiply(a, n.mod(N));
    }
    if (n.mod(2).eq(0)) {
        return jordan_double(jordan_multiply(a, n.divide(TWO)));
    }
    if (n.mod(2).eq(1)) {
        return jordan_add(jordan_double(jordan_multiply(a, n.divide(TWO))), a);
    }
}

var to_jordan = function (p) {
    return [[p[0], ONE], [p[1], ONE]];
}

var from_jordan = function (p) {
    return [p[0][0].multiply(p[0][1].modInv(P)).mod(P), p[1][0].multiply(p[1][1].modInv(P)).mod(P)];
}

var mul = function (a, n) {
    return from_jordan(jordan_multiply(to_jordan(a), n))
}

var div = function (a, n) {
    return from_jordan(jordan_multiply(to_jordan(a), n.modInv(N)))
}

var add = function (a, b) {
    return from_jordan(jordan_add(to_jordan(a), to_jordan(b)))
}

var sub = function (a, b) {
    return from_jordan(jordan_add(to_jordan(a), to_jordan([b[0], b[1].multiply(-1)])))
}

var negate = function (a) {
    return [a[0], P.subtract(a[1]).mod(P)];
}

//¹²³⁴⁵⁶⁷⁸⁹⁰
var N = new BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16);
var P = new BN('fffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f', 16);  //2²⁵⁶ - 2³² - 2⁹ - 2⁸ - 2⁷ - 2⁶ - 2⁴ - 1



var Pp1d4 = new BN('3fffffffffffffffffffffffffffffffffffffffffffffffffffffffbfffff0c', 16);
var ZERO = new BN(0);
var ONE = new BN(1);
var TWO = new BN(2);
var THREE = new BN(3);
var SEVEN = new BN(7);
var X = new BN('79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', 16);
var Y = new BN('483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8', 16);


//now recover public key
//http://2coin.org/index.html?txid=5cc5364a43ee9212387bfd45fa2e2c5e8ed7b2a32fa2f8e3084f6c8845ca3e15
var R = new BN('3b78ce563f89a0ed9414f5aa28ad0d96d6795f9c63', 16);
var S = new BN('5d38a230719d7282d6650c7a19ea810531501d391448aa61061828a073da404d', 16);
var Z = new BN('422e18e3c79ed7ba9eb41754d26ab846d6c0644abb51eeca74a8973d4d8e656b', 16);

//http://2coin.org/index.html?txid=9ec4bc49e828d924af1d1029cacf709431abbde46d59554b62bc270e3b29c4b1
//var R = new BN('d47ce4c025c35ec440bc81d99834a624875161a26bf56ef7fdc0f5d52f843ad1', 16);
//var S = new BN('44e1ff2dfd8102cf7a47c21d5c9fd5701610d04953c6836596b4fe9dd2f53e3e', 16);
//var Z = new BN('c0e2d0a89a348de88fda08211c70d1d7e52ccef2eb9459911bf977d587784c6e', 16);

//y² = x³ + 7    <--- secp256k1 curve

console.log("R                = " + R.toString(16));
console.log("S                = " + S.toString(16));
console.log("Z                = " + Z.toString(16));

console.log();

//R is the x coordinate of an ecPoint where the x value = R, so we need to find the y value.
//we can use the function y² = x³ + 7
var x = R;
console.log("x                = " + x.toString(16));

var ySquared = x.pow(THREE).add(SEVEN).mod(P);
console.log("y²               = " + ySquared.toString(16));

//there are two possible answers that produce a squared result, ie, 4 = 2² or -2². We only need one of them, doesn't matter which.
var y = ySquared.modPow(Pp1d4, P); //get the root of ySquared
//var y = P.minus(ySquared.modPow(Pp1d4, P)).mod(P); //i can also get the other answer if i wanted by subtracting the first result from P
console.log("y                = " + y.toString(16));

var ecPointR = [x, y];
console.log("ecPointR         = " + ecPointR[0].toString(16) + ", " + ecPointR[1].toString(16));
console.log("or");
console.log("ecPointR         = " + ecPointR[0].toString(16) + ", " + P.minus(ecPointR[1]).mod(P).toString(16));

console.log();


//calculate some more constants

var SdR = S.multiply(R.modInv(N)).mod(N);
console.log("S/R              = " + SdR.toString(16));

var ZdR = Z.multiply(R.modInv(N)).mod(N);
console.log("Z/R              = " + ZdR.toString(16));

var ecPointRmSdR = mul(ecPointR, SdR);
console.log("ecPointR * (S/R) = [" + ecPointRmSdR[0].toString(16) + ", " + ecPointRmSdR[1].toString(16) + "]");

var ecPointZdR = mul([X, Y], ZdR);
console.log("ecPoint(Z/R)     = [" + ecPointZdR[0].toString(16) + ", " + ecPointZdR[1].toString(16) + "]");

console.log();
console.log("-------------");
console.log();
console.log("4 Possible ecPoints for the public key");
console.log();
var ecPointPubKey1 = sub(ecPointRmSdR, ecPointZdR);
var ecPointPubKey2 = sub(ecPointZdR, ecPointRmSdR);
var ecPointPubKey3 = sub(negate(ecPointRmSdR), ecPointZdR);
var ecPointPubKey4 = sub(ecPointZdR, negate(ecPointRmSdR));


console.log("(1) pubKeyPoint  = [" + ecPointPubKey1[0].toString(16) + ", " + ecPointPubKey1[1].toString(16) + "]");
console.log("(2) pubKeyPoint  = [" + ecPointPubKey2[0].toString(16) + ", " + ecPointPubKey2[1].toString(16) + "]");
console.log("(3) pubKeyPoint  = [" + ecPointPubKey3[0].toString(16) + ", " + ecPointPubKey3[1].toString(16) + "]");
console.log("(4) pubKeyPoint  = [" + ecPointPubKey4[0].toString(16) + ", " + ecPointPubKey4[1].toString(16) + "]");
console.log();

console.log("-------------");
console.log();
console.log("8 possible crypto formatted public keys");
console.log();

console.log("uncompressed pubkey (1)        = 04" + ecPointPubKey1[0].toString(16) + ecPointPubKey1[1].toString(16));
if(ecPointPubKey1[1].mod(TWO).eq(ZERO)){
    console.log("compressed pubkey (1) (even y) = 02" + ecPointPubKey1[0].toString(16));
}else{
    console.log("compressed pubkey (1) (odd y)  = 03" + ecPointPubKey1[0].toString(16));
}

console.log();
console.log("uncompressed pubkey (1)        = 04" + ecPointPubKey2[0].toString(16) + ecPointPubKey2[1].toString(16));
if(ecPointPubKey2[1].mod(TWO).eq(ZERO)){
    console.log("compressed pubkey (1) (even y) = 02" + ecPointPubKey2[0].toString(16));
}else{
    console.log("compressed pubkey (1) (odd y)  = 03" + ecPointPubKey2[0].toString(16));
}

console.log();
console.log("uncompressed pubkey (1)        = 04" + ecPointPubKey3[0].toString(16) + ecPointPubKey3[1].toString(16));
if(ecPointPubKey3[1].mod(TWO).eq(ZERO)){
    console.log("compressed pubkey (1) (even y) = 02" + ecPointPubKey3[0].toString(16));
}else{
    console.log("compressed pubkey (1) (odd y)  = 03" + ecPointPubKey3[0].toString(16));
}

console.log();
console.log("uncompressed pubkey (1)        = 04" + ecPointPubKey4[0].toString(16) + ecPointPubKey4[1].toString(16));
if(ecPointPubKey4[1].mod(TWO).eq(ZERO)){
    console.log("compressed pubkey (1) (even y) = 02" + ecPointPubKey4[0].toString(16));
}else{
    console.log("compressed pubkey (1) (odd y) = 03" + ecPointPubKey4[0].toString(16));
}
console.log();



//var oneG = mul([X, Y], ONE);
//console.log("1  " + oneG[0].toString(16) + " " + oneG[1].toString(16));

// var twoG = add(oneG, oneG);
// console.log("2  " + twoG[0].toString(16) + " " + twoG[1].toString(16));

// var minus1G = sub(oneG, twoG)
// console.log("-1 " + minus1G[0].toString(16) + " " + minus1G[1].toString(16));

// var halfTwoG = div(twoG, TWO)
// console.log("1  " + halfTwoG[0].toString(16) + " " + halfTwoG[1].toString(16));

// var twoG = mul([X, Y], TWO);
// console.log(twoG[0].toString(16) + " " + twoG[1].toString(16));

// var threeG = mul([X, Y], THREE);
// console.log("3  " + threeG[0].toString(16) + " " + threeG[1].toString(16));


// var fourG = mul([X, Y], new BN(4));
// console.log(fourG[0].toString(16) + " " + fourG[1].toString(16));

// var fiveG = mul([X, Y], new BN(5));
// console.log(fiveG[0].toString(16) + " " + fiveG[1].toString(16));

// var sixG = mul([X, Y], new BN(6));
// console.log("6  " + sixG[0].toString(16) + " " + sixG[1].toString(16));

// var half6G = div(sixG, TWO);
// console.log("3  " + half6G[0].toString(16) + " " + half6G[1].toString(16));

//var testG = div(oneG, TWO);
//console.log("t  " + testG[0].toString(16) + " " + testG[1].toString(16));

// var testG = [ZERO, ZERO];
// console.log("0  " + testG[0].toString(16) + " " + testG[1].toString(16));
// for (var i = 1; i < 10; i++) {
//     testG = add(testG, oneG);
//     console.log(i + "\t" + testG[0].toString(16) + " " + testG[1].toString(16));

// }