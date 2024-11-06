!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).KeyboardBarcodeScanner=t()}(this,(function(){"use strict";class e{constructor(e){this._events={}}on(e,t){this._events[e]=this._events[e]||[],this._events[e].push(t)}emit(e,...t){let s=this._events[e];s&&s.forEach((e=>{setTimeout((()=>e(...t)),0)}))}}class t{static decode(e,t){let s={symbology:null},a=e[1],i=e[2];switch(a){case"A":s.symbology="code39";break;case"B":s.symbology="telepen";break;case"C":s.symbology="code128","1"===i&&(s.symbology="gs1-128",s.fnc1=1);break;case"D":s.symbology="code1";break;case"E":13===t.length?s.symbology="ean13":12===t.length?s.symbology="upca":8===t.length&&(s.symbology="4"===i?"ean8":"upce");break;case"F":s.symbology="codabar";break;case"G":s.symbology="code93";break;case"H":s.symbology="code11";break;case"I":s.symbology="interleaved-2-of-5";break;case"K":s.symbology="code16k";break;case"L":s.symbology="pdf417";break;case"M":s.symbology="msi";break;case"N":s.symbology="anker";break;case"O":"4"!==i&&"5"!==i||(s.symbology="codablock-f"),"6"===i&&(s.symbology="codablock-a");break;case"P":s.symbology="plessey";break;case"R":case"S":s.symbology="straight-2-of-5";break;case"Q":s.symbology="qr-code","0"===i?s.model=1:(s.model=2,"3"!==i&&"4"!==i||(s.fnc1=1),"5"!==i&&"6"!==i||(s.fnc1=2));break;case"U":s.symbology="maxicode";break;case"X":if("0"===i)s.symbology="ean13";else switch(i){case"9":s.symbology="ean13";break;case"C":s.symbology="ean8";break;case"g":s.symbology="upca";break;case"k":s.symbology="upce";break;case"r":s.symbology="gs1-databar-omni";break;case"s":s.symbology="gs1-databar-limited";break;case"t":s.symbology="gs1-databar-expanded";break;case"V":s.symbology="pdf417";break;case"S":s.symbology="qr-code-micro"}break;case"c":s.symbology="channel-code";break;case"d":s.symbology="data-matrix","2"!==i&&"5"!==i||(s.fnc1=1),"3"!==i&&"6"!==i||(s.fnc1=2);break;case"e":s.symbology="gs1-databar-omni";break;case"h":s.symbology="chinese-sensible-code";break;case"o":s.symbology="ocr";break;case"p":s.symbology="posi-code";break;case"s":s.symbology="super-code";break;case"z":s.symbology="aztec-code","1"!==i&&"4"!==i&&"7"!==i&&"A"!==i||(s.fnc1=1),"2"!==i&&"5"!==i&&"8"!==i&&"B"!==i||(s.fnc1=!0)}return s}}const s=Object.fromEntries([["SSCC",["00"]],["GTIN",["01"]],["CONTENT",["02"]],["BATCH/LOT",["10"]],["PROD DATE",["11"]],["DUE DATE",["12"]],["PACK DATE",["13"]],["BEST BEFORE or BEST BY",["15"]],["SELL BY",["16"]],["USE BY OR EXPIRY",["17"]],["VARIANT",["20"]],["SERIAL",["21"]],["CPV",["22"]],["VAR. COUNT",["30"]],["COUNT",["37"]],["INTERNAL",["90","91","92","93","94","95","96","97","98","99"]],["ADDITIONAL ID",["240"]],["CUST. PART NO.",["241"]],["MTO VARIANT",["242"]],["PCN",["243"]],["SECONDARY SERIAL",["250"]],["REF. TO SOURCE ",["251"]],["GDTI",["253"]],["GLN EXTENSION COMPONENT",["254"]],["GCN",["255"]],["ORDER NUMBER",["400"]],["GINC",["401"]],["GSIN",["402"]],["ROUTE",["403"]],["SHIP TO LOC",["410"]],["BILL TO ",["411"]],["PURCHASE FROM",["412"]],["SHIP FOR LOC",["413"]],["LOC No",["414"]],["PAY TO",["415"]],["PROD/SERV LOC",["416"]],["SHIP TO POST",["420","421"]],["ORIGIN",["422"]],["COUNTRY - INITIAL PROCESS.",["423"]],["COUNTRY - PROCESS.",["424"]],["COUNTRY - DISASSEMBLY",["425"]],["COUNTRY - FULL PROCESS",["426"]],["ORIGIN SUBDIVISION",["427"]],["NHRN PZN",["710"]],["NHRN CIP",["711"]],["NHRN CN",["712"]],["NHRN DRN",["713"]],["NHRN AIM",["714"]],["NET WEIGHT (kg)",["3100","3101","3102","3103","3104","3105"]],["LENGTH (m)",["3110","3111","3112","3113","3114","3115"]],["WIDTH (m)",["3120","3121","3122","3123","3124","3125"]],["HEIGHT (m)",["3130","3131","3132","3133","3134","3135"]],["AREA (m^2)",["3140","3141","3142","3143","3144","3145"]],["NET VOLUME (l)",["3150","3151","3152","3153","3154","3155"]],["NET VOLUME (m^3)",["3160","3161","3162","3163","3164","3165"]],["NET WEIGHT (lb)",["3200","3201","3202","3203","3204","3205"]],["LENGTH (in)",["3210","3211","3212","3213","3214","3215"]],["LENGTH (ft)",["3220","3221","3222","3223","3224","3225"]],["LENGTH (yd)",["3230","3231","3232","3233","3234","3235"]],["WIDTH (in)",["3240","3241","3242","3243","3244","3245"]],["WIDTH (ft)",["3250","3251","3252","3253","3254","3255"]],["WIDTH (yd)",["3260","3261","3262","3263","3264","3265"]],["HEIGHT (in)",["3270","3271","3272","3273","3274","3275"]],["HEIGHT (ft)",["3280","3281","3282","3283","3284","3285"]],["HEIGHT (yd)",["3290","3291","3292","3293","3294","3295"]],["GROSS WEIGHT (kg)",["3300","3301","3302","3303","3304","3305"]],["LENGTH (m), log",["3310","3311","3312","3313","3314","3315"]],["WIDTH (m), log",["3320","3321","3322","3323","3324","3325"]],["HEIGHT (m), log",["3330","3331","3332","3333","3334","3335"]],["AREA (m^2), log",["3340","3341","3342","3343","3344","3345"]],["VOLUME (l), log",["3350","3351","3352","3353","3354","3355"]],["VOLUME (m^3), log",["3360","3361","3362","3363","3364","3365"]],["KG PER m^2",["3370","3371","3372","3373","3374","3375"]],["GROSS WEIGHT (lb)",["3400","3401","3402","3403","3404","3405"]],["LENGTH (in), log",["3410","3411","3412","3413","3414","3415"]],["LENGTH (ft), log",["3420","3421","3422","3423","3424","3425"]],["LENGTH (yd), log",["3430","3431","3432","3433","3434","3435"]],["WIDTH (in), log",["3440","3441","3442","3443","3444","3445"]],["WIDTH (ft), log",["3450","3451","3452","3453","3454","3455"]],["WIDTH (yd), log",["3460","3461","3462","3463","3464","3465"]],["HEIGHT (in), log",["3470","3471","3472","3473","3474","3475"]],["HEIGHT (ft), log",["3480","3481","3482","3483","3484","3485"]],["HEIGHT (yd), log",["3490","3491","3492","3493","3494","3495"]],["AREA (in^2)",["3500","3501","3502","3503","3504","3505"]],["AREA (ft^2)",["3510","3511","3512","3513","3514","3515"]],["AREA (yd^2)",["3520","3521","3522","3523","3524","3525"]],["AREA (in^2), log",["3530","3531","3532","3533","3534","3535"]],["AREA (ft^2), log",["3540","3541","3542","3543","3544","3545"]],["AREA (yd^2), log",["3550","3551","3552","3553","3554","3555"]],["NET WEIGHT (t oz)",["3560","3561","3562","3563","3564","3565"]],["NET VOLUME (oz)",["3570","3571","3572","3573","3574","3575"]],["NET VOLUME (qt)",["3600","3601","3602","3603","3604","3605"]],["NET VOLUME (gal.)",["3610","3611","3612","3613","3614","3615"]],["VOLUME (qt), log",["3620","3621","3622","3623","3624","3625"]],["VOLUME (gal.), log",["3630","3631","3632","3633","3634","3635"]],["VOLUME (in^3) ",["3640","3641","3642","3643","3644","3645"]],["VOLUME (ft^3) ",["3650","3651","3652","3653","3654","3655"]],["VOLUME (yd^3) ",["3660","3661","3662","3663","3664","3665"]],["VOLUME (in^3), log",["3670","3671","3672","3673","3674","3675"]],["VOLUME (ft^3), log",["3680","3681","3682","3683","3684","3685"]],["VOLUME (yd^3), log",["3690","3691","3692","3693","3694","3695"]],["AMOUNT",["3900","3901","3902","3903","3904","3905","3906","3907","3908","3909","3910","3911","3912","3913","3914","3915","3916","3917","3918","3919"]],["PRICE",["3920","3921","3922","3923","3924","3925","3926","3927","3928","3929","3930","3931","3932","3933","3934","3935","3936","3937","3938","3939"]],["PRCNT OFF",["3940","3941","3942","3943"]],["NSN",["7001"]],["MEAT CUT",["7002"]],["EXPIRY TIME",["7003"]],["ACTIVE POTENCY",["7004"]],["CATCH AREA",["7005"]],["FIRST FREEZE DATE",["7006"]],["HARVEST DATE",["7007"]],["AQUATIC SPECIES",["7008"]],["FISHING GEAR TYPE",["7009"]],["PROD METHOD",["7010"]],["REFURB LOT",["7020"]],["FUNC STAT",["7021"]],["REV STAT",["7022"]],["GIAI - ASSEMBLY",["7023"]],["PROCESSOR # 0",["7030"]],["PROCESSOR # 1",["7031"]],["PROCESSOR # 2",["7032"]],["PROCESSOR # 3",["7033"]],["PROCESSOR # 4",["7034"]],["PROCESSOR # 5",["7035"]],["PROCESSOR # 6",["7036"]],["PROCESSOR # 7",["7037"]],["PROCESSOR # 8",["7038"]],["PROCESSOR # 9",["7039"]],["CERT # 0",["7230"]],["CERT # 1",["7231"]],["CERT # 2",["7232"]],["CERT # 3",["7233"]],["CERT # 4",["7234"]],["CERT # 5",["7235"]],["CERT # 6",["7236"]],["CERT # 7",["7237"]],["CERT # 8",["7238"]],["CERT # 9",["7239"]],["DIMENSIONS",["8001"]],["CMT No",["8002"]],["GRAI",["8003"]],["GIAI",["8004"]],["PRICE PER UNIT",["8005"]],["ITIP",["8006"]],["IBAN",["8007"]],["PROD TIME",["8008"]],["OPT SEN",["8009"]],["CPID",["8010"]],["CPID SERIAL",["8011"]],["VERSION",["8012"]],["GMN (for medical devices, the default, global data title is BUDI-DI )",["8013"]],["GSRN - PROVIDER",["8017"]],["GSRN - RECIPIENT",["8018"]],["SRIN",["8019"]],["REF No",["8020"]],["ITIP CONTENT",["8026"]],["POINTS",["8111"]],["PRODUCT URL",["8200"]]].map((e=>e[1].map((t=>[t,e[0]])))).reduce(((e,t)=>[...e,...t]),[])),a={"00":20,"01":16,"02":16,"03":16,"04":18,11:8,12:8,13:8,14:8,15:8,16:8,17:8,18:8,19:8,20:4,31:10,32:10,33:10,34:10,35:10,36:10,41:16},i=Object.fromEntries([["(\\d{12,14}|\\d{8})",["01"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,20})",["10","21","22","243","254","420","710","711","712","713","714","7020","7021","7022","8002","8012"]],["(\\d{6})",["11","12","13","15","16","17","3100","3101","3102","3103","3104","3105","3110","3111","3112","3113","3114","3115","3120","3121","3122","3123","3124","3125","3130","3131","3132","3133","3134","3135","3140","3141","3142","3143","3144","3145","3150","3151","3152","3153","3154","3155","3160","3161","3162","3163","3164","3165","3200","3201","3202","3203","3204","3205","3210","3211","3212","3213","3214","3215","3220","3221","3222","3223","3224","3225","3230","3231","3232","3233","3234","3235","3240","3241","3242","3243","3244","3245","3250","3251","3252","3253","3254","3255","3260","3261","3262","3263","3264","3265","3270","3271","3272","3273","3274","3275","3280","3281","3282","3283","3284","3285","3290","3291","3292","3293","3294","3295","3300","3301","3302","3303","3304","3305","3310","3311","3312","3313","3314","3315","3320","3321","3322","3323","3324","3325","3330","3331","3332","3333","3334","3335","3340","3341","3342","3343","3344","3345","3350","3351","3352","3353","3354","3355","3360","3361","3362","3363","3364","3365","3370","3371","3372","3373","3374","3375","3400","3401","3402","3403","3404","3405","3410","3411","3412","3413","3414","3415","3420","3421","3422","3423","3424","3425","3430","3431","3432","3433","3434","3435","3440","3441","3442","3443","3444","3445","3450","3451","3452","3453","3454","3455","3460","3461","3462","3463","3464","3465","3470","3471","3472","3473","3474","3475","3480","3481","3482","3483","3484","3485","3490","3491","3492","3493","3494","3495","3500","3501","3502","3503","3504","3505","3510","3511","3512","3513","3514","3515","3520","3521","3522","3523","3524","3525","3530","3531","3532","3533","3534","3535","3540","3541","3542","3543","3544","3545","3550","3551","3552","3553","3554","3555","3560","3561","3562","3563","3564","3565","3570","3571","3572","3573","3574","3575","3600","3601","3602","3603","3604","3605","3610","3611","3612","3613","3614","3615","3620","3621","3622","3623","3624","3625","3630","3631","3632","3633","3634","3635","3640","3641","3642","3643","3644","3645","3650","3651","3652","3653","3654","3655","3660","3661","3662","3663","3664","3665","3670","3671","3672","3673","3674","3675","3680","3681","3682","3683","3684","3685","3690","3691","3692","3693","3694","3695","7006","8005"]],["(\\d{2})",["20"]],["(\\d{0,8})",["30","37"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,30})",["90","240","241","250","251","400","401","403","7002","7023","8004","8013"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,90})",["91","92","93","94","95","96","97","98","99"]],["(\\d{0,6})",["242"]],["(\\d{13})([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,17})",["253"]],["(\\d{13})(\\d{0,12})",["255"]],["(\\d{17})",["402"]],["(\\d{13})",["410","411","412","413","414","415","416","7001"]],["(\\d{3})([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,9})",["421"]],["(\\d{3})",["422","424","426"]],["(\\d{3})(\\d{0,12})",["423","425"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,3})",["427","7008"]],["(\\d{0,15})",["3900","3901","3902","3903","3904","3905","3906","3907","3908","3909","3920","3921","3922","3923","3924","3925","3926","3927","3928","3929"]],["(\\d{3})(\\d{0,15})",["3910","3911","3912","3913","3914","3915","3916","3917","3918","3919","3930","3931","3932","3933","3934","3935","3936","3937","3938","3939"]],["(\\d{4})",["3940","3941","3942","3943","8111"]],["(\\d{10})",["7003"]],["(\\d{0,4})",["7004"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,12})",["7005"]],["(\\d{6,12})",["7007"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,10})",["7009"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,2})",["7010"]],["(\\d{3})([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,27})",["7030","7031","7032","7033","7034","7035","7036","7037","7038","7039"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{2,30})",["7230","7231","7232","7233","7234","7235","7236","7237","7238","7239"]],["(\\d{14})",["8001","02"]],["(\\d{14})([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,16})",["8003"]],["(\\d{14})(\\d{2})(\\d{2})",["8006","8026"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,34})",["8007"]],["(\\d{8})(\\d{0,4})",["8008"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,50})",["8009"]],["([\\x23\\x2D\\x2F\\x30-\\x39\\x41-\\x5A]{0,30})",["8010"]],["(\\d{0,12})",["8011"]],["(\\d{18})",["8017","8018","00"]],["(\\d{0,10})",["8019"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,25})",["8020"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,70})",["8110","8112","8200"]]].map((e=>e[1].map((t=>[t,e[0]])))).reduce(((e,t)=>[...e,...t]),[])),n={253:13,255:13,402:"L",410:"L",411:"L",412:"L",413:"L",414:"L",415:"L",416:"L",8003:14,8006:14,8017:"L",8018:"L",8026:14,"00":"L","01":"L","02":"L"};class o{static is(e){return"string"==typeof e&&(e.match(/^(https?|HTTPS?):(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?([^?#]*)(((\/(01|8006|8013|8010|414|415|417|8017|8018|255|00|253|401|402|8003|8004)\/)(\d{4}[^\/]+)(\/[^/]+\/[^/]+)?[/]?(\?([^?\n]*))?(#([^\n]*))?))/)||e.match(/^(https?|HTTPS?):(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?([^?#]*)((\/[0-9A-Za-z_-]{10,}$))/))}static calculateCheckDigit(e,t){let s=0,a=0;for(let i=("L"===n[e]?t.length:n[e])-2;i>=0;i--){let e;e=s%2==0?3:1,a+=t.charAt(i)*e,s++}return(10-a%10)%10}static verifyCheckDigit(e,t){if(!n[e])return!0;let s="L"===n[e]?t.length:n[e],a=parseInt(t.charAt(s-1),10),i=o.calculateCheckDigit(e,t);return a!==i?(console.log(`Invalid check digit: An invalid check digit was found for the primary identification key (${e})${t}; the correct check digit should be ${i} at position ${s}`),!1):void 0}static verifySyntax(e,t){return!!new RegExp("^"+i[e]+"$").test(t)||(console.log(`Syntax error: Invalid syntax for value of (${e}): ${t}`),!1)}static parse(e){let t=[],a=new URL(e);if("/"!=a.pathname){let e=a.pathname.substr(1).split("/");for(;e.length>=2;)t.push([e.shift(),decodeURIComponent(e.shift())])}if(""!=a.search){let e=[...new URLSearchParams(a.search.replace(/;/,"&"))];for(let[s,a]of e)t.push([s,a])}let i=[];for(let[e,a]of t){let t=!0;t&=o.verifySyntax(e,a),t&=o.verifyCheckDigit(e,a),t&&("01"!=e&&"02"!=e||(a=a.padStart(14,"0")),i.push({ai:e,value:a,label:s[e]}))}return i.sort(((e,t)=>e.ai.localeCompare(t.ai))),i}}const r=String.fromCharCode(29);class l{static parse(e){let t=[],i=e.split(r);for(let e of i)for(;e.length;){let s=e.substr(0,2);s in a?(t.push({value:e.substr(0,a[s])}),e=e.substr(a[s])):(t.push({value:e}),e="")}for(let e of t){let t;for(let a=2;a<=4;a++)if(e.value.substr(0,a)in s){t=a;break}t&&(e.ai=e.value.substr(0,t),e.value=e.value.substr(t),e.label=s[e.ai])}return t}}var c={UPCE:class{static expand(e){const t=e.substring(1,7),s=e.charAt(7);let a="";switch(t.charAt(5)){case"0":case"1":case"2":a=e.charAt(0)+t.substring(0,2)+t.charAt(5)+"0000"+t.substring(2,5);break;case"3":a=e.charAt(0)+t.substring(0,3)+"00000"+t.substring(3,5);break;case"4":a=e.charAt(0)+t.substring(0,4)+"00000"+t.charAt(4);break;default:a=e.charAt(0)+t+"0000"}return a+=s,a}}};class m{static parse(e){let t=[];if(e.fnc1||e.value.includes(String.fromCharCode(29))?t=l.parse(e.value):o.is(e.value)?t=o.parse(e.value):e.symbology.startsWith("gs1-databar")?t=l.parse(e.value):["upca","ean8","ean13"].includes(e.symbology)&&(t=[{ai:"01",label:"GTIN",value:e.value.padStart(14,"0")}]),"upce"===e.symbology&&(t=[{ai:"01",label:"GTIN",value:c.UPCE.expand(e.value).padStart(14,"0")}]),t.length){let e={elements:t},s=t.find((e=>"01"===e.ai));return s&&(e.gtin=s.value),e}}}class y{static checkdigit(e){const t=e.split("").map((e=>parseInt(e,10))).reverse().reduce(((e,t,s)=>e+(s%2==1?t:3*t)),0);return 10*Math.ceil(t/10)-t}static detect(e){if(e.startsWith("http"))return{symbology:"qr-code",guess:!0};if(e.startsWith("X-HM:"))return{symbology:"qr-code",guess:!1};if(e.startsWith("MT:"))return{symbology:"qr-code",guess:!1};if(e.startsWith("WIFI:"))return{symbology:"qr-code",guess:!1};if(e.match(/^[0-9]+$/)&&8==e.length){if(SymbologyDetector.checkdigit(e.slice(0,-1))==e.slice(-1))return{symbology:"ean8",guess:!1}}else if(e.match(/^[0-9]+$/)&&12==e.length){if(SymbologyDetector.checkdigit(e.slice(0,-1))==e.slice(-1))return{symbology:"upca",guess:!1}}else if(e.match(/^[0-9]+$/)&&13==e.length){if(SymbologyDetector.checkdigit(e.slice(0,-1))==e.slice(-1))return{symbology:"ean13",guess:!1}}else{if(e.match(/^M[0-9]/))return{symbology:"aztec-code",guess:!0};if(e.length>128)return{symbology:"pdf417",guess:!0};if(e.length>32)return{symbology:"qr-code",guess:!0}}}}return class{#e;#t;#s=40;#a=200;constructor(t){this.#e=Object.assign({timing:"auto",guessSymbology:!1,allowedSymbologies:[]},t||{}),this.#t={state:"unknown",command:[],keydown:this.#i.bind(this),interval:null,emitter:new e,buffer:[],keystrokes:0,timestamp:{first:null,last:null}},"auto"!==this.#e.timing&&"number"==typeof this.#e.timing&&(this.#s=this.#e.timing,this.#a=5*this.#e.timing)}async connect(){this.#n()}async reconnect(){this.#n()}async disconnect(){this.#o()}async#n(){document.addEventListener("keydown",this.#t.keydown),this.#t.interval=setInterval((()=>this.#r()),50),this.#t.emitter.emit("connected",{type:"keyboard"})}async#o(){document.removeEventListener("keydown",this.#t.keydown),clearInterval(this.#t.interval),this.#t.emitter.emit("disconnected")}#i(e){let t=performance.now();if("INPUT"!==e.target.tagName&&"TEXTAREA"!==e.target.tagName){if("unknown"!==this.#t.state&&(e.stopPropagation(),e.preventDefault()),console.log(e),null===this.#t.timestamp.first&&(this.#t.timestamp.first=t),this.#t.keystrokes>1&&"unknown"===this.#t.state&&t-this.#t.timestamp.last>this.#s&&(console.log(`forcing parse because ${this.#s}ms since last keydown`,t,this.#t.timestamp.last,t-this.#t.timestamp.last),this.#l(this.#t.buffer),this.#c()),this.#t.keystrokes>2&&"unknown"===this.#t.state&&t-this.#t.timestamp.first<30*this.#t.keystrokes&&(this.#t.state="data"),"Clear"===e.key&&"NumLock"===e.code)return"command"!==this.#t.state?this.#t.state="command":"command"===this.#t.state&&(this.#m(),this.#t.state="data"),void(this.#t.buffer.length>0&&(this.#t.keystrokes++,this.#t.timestamp.last=t));if("unknown"===this.#t.state||"data"===this.#t.state)if(1===e.key.length)this.#t.buffer.push(e.key.charCodeAt(0));else{let t={Enter:13,Tab:9,"Escape:":27};t[e.key]&&this.#t.buffer.push(t[e.key])}else this.#t.command.push({key:e.key,code:e.code});this.#t.keystrokes++,this.#t.timestamp.last=t}}#r(){let e=performance.now();0!==this.#t.buffer.length&&e-this.#t.timestamp.last>this.#a&&(console.log(`forcing parse because ${this.#a}ms have passed`,e,this.#t.timestamp.last,e-this.#t.timestamp.last),this.#l(this.#t.buffer),this.#c())}#m(){if(0===this.#t.command.length)return;if("AltLeft"==this.#t.command.shift().code){let e=this.#t.command.map((e=>e.key)).join("");this.#t.buffer.push(parseInt(e,10))}this.#t.command=[]}#l(e){if(e.length>4){console.log(`received ${this.#t.keystrokes} keystrokes in ${parseInt(this.#t.timestamp.last-this.#t.timestamp.first,10)}ms, that is an average of ${parseInt((this.#t.timestamp.last-this.#t.timestamp.first)/this.#t.keystrokes,10)}ms per keystroke`);let s={value:String.fromCharCode.apply(null,e),bytes:[new Uint8Array(e)]};if(s.value.endsWith("\r")&&(s.value=s.value.slice(0,-1)),s.value.startsWith("]")){let e=t.decode(s.value.substr(0,3),s.value.substr(3));e&&(s.aim=s.value.substr(0,3),s.symbology=e),s.value=s.value.substr(3)}else if(this.#e.guessSymbology){let e=y.detect(s.value);e&&(s=Object.assign(s,e))}let a=m.parse(s);a&&(s.data=a),(0===this.#e.allowedSymbologies.length||this.#e.allowedSymbologies.includes(s.symbology))&&this.#t.emitter.emit("barcode",s)}}#c(){this.#t.buffer=[],this.#t.command=[],this.#t.state="unknown",this.#t.keystrokes=0,this.#t.timestamp={first:null,last:null}}addEventListener(e,t){this.#t.emitter.on(e,t)}}}));
