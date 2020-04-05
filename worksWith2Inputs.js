var _ = require('lodash');

var request = require("request");

var s2sha = require('./string2sha');
var RMDstring = require('./rmd2s');


function getTxid(txid,callback) {
    var options = {
    method: 'GET',
        url: 'https://rest.bitcoin.com/v2/rawtransactions/getRawTransaction/' + txid,
        qs: { verbose: 'true' },
        headers: {
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            Referer: 'https://rest.bitcoin.com/',
            'Accept-Language': 'pt-br',
            Host: 'rest.bitcoin.com',
            'Accept-Encoding': 'json',
            Accept: 'application/json',
        }
    };
    request(options, function (error, response, body) {
        callback(JSON.parse(body))
    });
}


function convert(value) {
    var hex = "";


    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

    function bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
    }

    function hex2unicode(hex) {
        var str = '';
        for (var bytes = [], c = 0; c < hex.length; c += 2) {
            str += String.fromCharCode(parseInt(hex.substr(c, 2), 16));
        }
        return str;
    }

    hex = value;

    var out = s2sha.create().update(new Uint8Array(hexToBytes(hex))).hex();
  //  console.log(out);
    var md160 = RMDstring.RMDstring(hex2unicode(out));

    console.log('1976a914'+ md160 +'88ac' )

    return md160

}


convert('0466bde1ce0a1f35bb5b8b5fe04febc84709f0c9614be69763d6dbd64fbf37e9bb14a19936e9c39b604a891f9657f501eb2e6d49da1370b46f7185999a0ed67876')


function convertx(){


    function clearHexInput() {
        document.getElementById("hexstring").value = "";
    }
    function clearUnicodeInput() {
        document.getElementById("unicodestring").value = "";
    }


}


var newOb = {

}


function containLetter(inputtxt){
if (inputtxt.match(/[a-z]/i)) {
    // alphabet letters found
    return true
}else{
    return false
}
}

getTxid('9ec4bc49e828d924af1d1029cacf709431abbde46d59554b62bc270e3b29c4b1', async (data) => {

    /*
    var initial = hex.slice(0,8)
    var qnt = hex.slice(8,10);
    var rr = hex.slice(10,74);
    var rx = hex.slice(74,82);
    var rz = hex.slice(82,90);
    var r4 = hex.slice(90,94);
    var r5 =  hex.slice(94,158);
    var r6 =  hex.slice(158,162);
    var r7 =  hex.slice(162,228);
    var r8 =  hex.slice(228,230);
    var r9 =  hex.slice(230,362);
    var r10 =  hex.slice(362,370);
    var r11 =  hex.slice(370,378);
    var r12 =  hex.slice(378,386);
    var r13 =  hex.slice(386,hex.length);



    if(r8.length === 4){

         r7 =  hex.slice(162,228);
         r8 =  hex.slice(228,230);
         r9 =  hex.slice(230,362);
         r10 =  hex.slice(362,370);
         r11 =  hex.slice(370,378);
         r12 =  hex.slice(378,386);
         r13 =  hex.slice(386,hex.length);

    }


    if(containLetter(r6)){
        console.log('tem letra')
         r5 =  hex.slice(94,160);
         r6 =  hex.slice(160,164);
         r7 =  hex.slice(164,228);

    }


    */
//    console.log(data)
    var inputs = data.vin;



    var father = data.hex;

    var initial = father.slice(0,8)
    var qnt = father.slice(8,10);

    father = father.replace(initial, ''+initial+'\n')
    father = father.replace(qnt, ''+qnt+'\n')

  //  father = father.replace(item.scriptSig.hex, ' \n ')
    father = replaceAll(father, 'ffffffff', '\nffffffff\n')
    father = replaceAll(father, '01000000', '\n01000000\n')

    for(x = 0; x <= 9; x++){
        var id = '022' + x;
        var id2 = '021' + x;
        father = replaceAll(father, id2, '\n'+id2+'\n')
        father = replaceAll(father, id, '\n'+id+'\n')
    }
    father = replaceAll(father, '0141', '\n'+'0141'+'\n')
    father = replaceAll(father, '0121', '\n'+'0121'+'\n')

    inputs.map((item,i) => {




       console.log('\n')

    })
    var RCORRETO = father.split('\n')[6];
    var SCORRETO = father.split('\n')[8];



    console.log(father.split('\n'))







    var outputs = data.vout;
  //  var raw = data.data.tx_hex.split('');

    var hex = data.hex

    function replaceAll(x, y, z) {
        return x.replace(new RegExp(y, 'g'), z);
    };

    var newX = [];

    var initial = hex.slice(0,8)
    var qnt = hex.slice(8,10);
    var rr = hex.slice(10,74);
    var rx = hex.slice(74,82);
    var rz = hex.slice(82,90);
    var r4 = hex.slice(90,94);
    var r5 =  hex.slice(94,158);
    var r6 =  hex.slice(158,162);
    var r7 =  hex.slice(162,226);
    var r8 =  hex.slice(226,230);
    var r9 =  hex.slice(230,360);
    var r10 =  hex.slice(360,368);
    var r11 =  hex.slice(368,376);
    var r12 =  hex.slice(376,384);
    var r13 =  hex.slice(384,hex.length);

   // console.log(hex)


   // console.log('3a2a893cd1d8c3e962e8678fc61ebe89f415a46bc8d9854a010000008a4730440220d47ce4c025c35ec440bc81d99834a624875161a26bf56ef7fdc0f5d52f843ad10220'.length)

    var ob = {
        initial : initial,
        qnt: qnt,
        TXID: reverse(rr),
        rx: rx,
        rz: rz,
        r4: r4,
        R: r5,
        r6: r6,
        S:r7,
        r8: r8,
        r9: r9,
        r10: r10,
        r11: r11,
        r12: r12,
        r13: r13
    }



    await getTxid( ob["TXID"] , (data) => {
      //  console.log(data)
        var num = 0;

        if(!!data.vout[1]){
            num = 1
        }else{
            num = 0
        }

        ob.pubkeyhash = '19'+ data.vout[num].scriptPubKey.hex;

        if(ob.qnt === "02" || ob.qnt === "03"){
            var newR13 = r13.slice(0,56) + '00'+ r13.slice(334, r13.length);
            r13 = newR13

            var newString = '';
            newString += ob.initial + ob.qnt + rr + rx + ob.pubkeyhash + r10 + r11 + r12 + r13 + ob.initial;
            console.log(newString)

            var str = newString;
            var first = s2sha.create().update(new Uint8Array(hexToBytes(str))).hex();
            var second = s2sha.create().update(new Uint8Array(hexToBytes(first))).hex();
            newOb.R1 = ob.R
            newOb.R2 = ob.R



            newOb.S1 = ob.S
            newOb.Z1 = second

          //  var cnv = convert( ob.r9 )
          //  console.log(cnv)


            var newString = '';
            newString += ob.initial + ob.qnt + rr + rx + '00' + r10 + r11 + r12 + ob.r13.slice(0,56) + ob.pubkeyhash + ob.r13.slice(334, ob.r13.length) + ob.initial;

            console.log(newString)

            var str = newString;
            var first = s2sha.create().update(new Uint8Array(hexToBytes(str))).hex();
            var second = s2sha.create().update(new Uint8Array(hexToBytes(first))).hex();
            newOb.S2 = ob.r13.slice(136,200)
            newOb.Z2 = second



        }else{

            var newString = '';
            newString += ob.initial + ob.qnt + rr + rx + ob.pubkeyhash + r10 + r11 + r12 + r13 + ob.initial;

            var str = newString;
            var first = s2sha.create().update(new Uint8Array(hexToBytes(str))).hex();
            var second = s2sha.create().update(new Uint8Array(hexToBytes(first))).hex();

            newOb.R = ob.R



            newOb.S = ob.S
            newOb.Z = second

        }




        console.log(newOb)
    })


    /*


  //  hex = replaceAll(hex, '00000000', '\n00000000\n')
    hex = hex.replace('00000000', '\n00000000\n')
    hex = replaceAll(hex, '01000000', '\n01000000\n')
    hex = replaceAll(hex, '0220', '\n0220\n')
    hex = replaceAll(hex, '0221', '\n0221\n')
    hex = replaceAll(hex, '0141', '\n0141\n')
    hex = replaceAll(hex, 'ffffffff', '\nffffffff\n')
    hex = replaceAll(hex, '0000000000', '\n0000000000\n')


    var newArr = hex.split('\n')

    // hex = replaceAll(hex,'0220', '\n0220\n')
    var removeClean = [];

    newArr.map((item, i) => {
        if (item != '') {
            removeClean.push(item)
        }
    })

    var lastT;


    var obj  = {
        txid: '',
        r: '',
        s: '',
        z: ''
       // inputs: inputs,
       // lastT : []

    }
*/



    /*
    var r = '';

    removeClean.map(async (item, i,arr) => {

        console.log(item,i)
        if(i === 1){
            var ax = item.slice(2)
            obj.num = item.slice(0,2)
            obj.txid = ax

        }
        if(i === 5){
            var ax = item
            r = ax
            obj.r = r
        }

        if(i === 7){
            var ax = item
            obj.s = ax
        }
    })
    */



    function reverse(string) {
        var bytes = hexToBytes(string);
        bytes  = bytes.reverse();
        return bytesToHex(bytes)
    }


    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

    function bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join("");
    }


    /*
    console.log(obj,data)


    await getTxid( reverse(obj.txid) , (data) => {


        function hexToBytes(hex) {
            for (var bytes = [], c = 0; c < hex.length; c += 2)
                bytes.push(parseInt(hex.substr(c, 2), 16));
            return bytes;
        }




        console.log(data.vout[1].scriptPubKey.hex)



        var newString = removeClean[0] + removeClean[1] + removeClean[2] + '19'+ data.vout[1].scriptPubKey.hex  + removeClean[10] + removeClean[11] + removeClean[12] + removeClean[13] + removeClean[2]

        var str = newString;
        var first = s2sha.create().update(new Uint8Array(hexToBytes(str))).hex();
        var second = s2sha.create().update(new Uint8Array(hexToBytes(first))).hex();
        obj.z = second

        console.log(obj)
    });


*/




});
