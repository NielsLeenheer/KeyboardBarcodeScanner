# KeyboardBarcodeScanner

This is an library that allows you to use handheld barcode scanners in keyboard emulation mode. 

<br>

[![npm](https://img.shields.io/npm/v/@point-of-sale/keyboard-barcode-scanner)](https://www.npmjs.com/@point-of-sale/keyboard-barcode-scanner)
![GitHub License](https://img.shields.io/github/license/NielsLeenheer/KeyboardBarcodeScanner)


> This library is part of [@point-of-sale](https://point-of-sale.dev), a collection of libraries for interfacing browsers and Node with Point of Sale devices such as receipt printers, barcode scanners and customer facing displays.

<br>

## What does this library do?

By default most barcode scanners emulate a keyboard meaning all numbers and letters of a barcode will be individually 'typed' by the barcodescanner. This library will listen to global keyboard events and try to seperate out digits and letters from barcodes from other digits and letters that are being typed on the keyboard. 

Becauses of the nature of the library - it reads keyboard input - it can be easily tricked by very quickly typing on your keyboard. If you quickly slide your finger over the numbers on your keyboard it may get picked up as a barcode. There is nothing that can be done about this. The timings have been chosen so that in normal use it won't confuse typing with the output of a barcode scanner. 

One other note, while most barcode scanners type very quickly for a human, it is quite slow for computers. If you scan are very large 2D barcode it may quite a bit of time before the scanner is finished typing. Picking the right barcode scanner is also important. For example Honeywell scanners type very quickly - on average 10ms between keystrokes. But Zebra scanners are much slower, on average 80ms, with peaks up to 100ms. That means a QR code with around 250 characters may take up to 25 seconds to type out!

Another problem is that some more complex barcodes may include characters that are not letters, numbers or punctuation. But for example Tabs, and Enters. And if the scanner types this out in the browser window, it may "tab" it's way to the browser location bar, type some data and press Enter. So you end up doing a search on one part of the data in the barcode.

If you want your application to respond faster or be more accurate, you may be able to enable serial mode or HID mode for your barcode scanner and use one of the sister libraries: [WebHidBarcodeScanner](https://github.com/NielsLeenheer/WebHidBarcodeScanner) or [WebSerialBarcodeScanner](https://github.com/NielsLeenheer/WebSerialBarcodeScanner)

<br>

## How to use it?

Load the `keyboard-barcode-scanner.umd.js` file in the browser and instantiate a `KeyboardBarcodeScanner` object. 

```html
<script src='keyboard-barcode-scanner.umd.js'></script>

<script>

    const barcodeScanner = new KeyboardBarcodeScanner();

</script>
```

Or import the `keyboard-barcode-scanner.esm.js` module:

```js
import KeyboardBarcodeScanner from 'keyboard-barcode-scanner.esm.js';

const barcodeScanner = new KeyboardBarcodeScanner();
```

<br>

## Connect to a scanner

The first time you have to manually connect to the barcode scanner by calling the `connect()` function. 

```js
barcodeScanner.connect();
```

To find out when a barcode scanner is connected you can listen for the `connected` event using the `addEventListener()` function.

```js
barcodeScanner.addEventListener('connected', device => {
    console.log(`Connected to barcode scanner in keyboard emulation mode`);
});
```

The callback of the `connected` event is passed an object with the following properties:

-   `type`<br>
    Type of the connection that is used, in this case it is always `keyboard`.

To find out when a barcode scanner is disconnected you can listen for the `disconnected` event using the `addEventListener()` function.

```js
barcodeScanner.addEventListener('disconnected', () => {
    console.log(`Disconnected`);
});
```

<br>

## Configuration

### Symbology 

Because the barcodes are `typed` by the scanner, we may not get any information about the symbology, only the data of the barcode itself. 

However the library can make an educated guess based on the content. For example, if it starts with `http` it usually is a QR code. If it is 13 digits and the last digit is a check digit, it is usually an EAN13 code and similarly with 12 digits is usually a UPC-A. 

By default this behaviour is turned off. If you want this library to guess the symbology you can turn it on:

```js
const barcodeScanner = new KeyboardBarcodeScanner({
    guessSymbology: true
});
```

On some scanners it may actually be possible to add an AIM Code ID as a prefix to the barcode. This is a 3 character identifier for the symbology of the barcode. To enable this for your barcode scanner you may need to scan a configuration barcode. For more information look at the documentation of your barcode scanner. If this AIM Code ID is detected, it will be used to determine the symbology of the barcode.

By default this library will return barcodes of every symbology. However if you want to use this library in a specific environment, such as retail, you can limit this library to only allow symbologies that are used in retail, for example: 

```js
const barcodeScanner = new KeyboardBarcodeScanner({
    allowedSymbologies: [ 'ean13', 'ean8', 'upca', 'upce', 'qr-code' ]
});
```

This will allow all EAN and UPC barcodes. But also QR-codes because the retail industry is moving to the QR code based GS Digital Links in the coming years. These digital links contain an URL and can be used by consumers to read more about the product they are buying or have bought. But it also includes the Global Trade Identification Number (GTIN) that is also used by EAN and UPC barcodes. 

If we find GS1 data such as the GTIN in the scanned barcode we will automatically decode it and place it in the data property:

```js
barcodeScanner.addEventListener('barcode', e => {
    if (e.data?.gtin) {
        console.log(`Found barcode with GTIN ${e.data.gtin}`);
    }
});
```

<br>

## Events

Once connected you can use listen for the following events to receive data from the barcode scanner.

### Scanning barcodes

Whenever the libary detects a barcode, it will send out a `barcode` event that you can listen for.

```js
barcodeScanner.addEventListener('barcode', e => {
    console.log(`Found barcode ${e.value} with symbology ${e.symbology}`);
});
```

The callback is passed an object with the following properties:

-   `value`<br>
    The value of the barcode as a string
-   `data`<br>
    If the barcode contains GS1 data, such as the Global Trade Identification Number (GTIN) the data will be parsed into elements.
-   `aim`<br>
    Optionally, the AIM Code ID, which is a 3 character ISO/IEC identifier and gives information about the symbology of the barcode which was scanned. 
-   `symbology`<br>
    Optionally a library specific identifier of the symbology. 
-   `guess`<br>
    If the symbology of this barcode is a guess, then `true`. If we are quite certain of the symbology, then `false`.
-   `bytes`<br>
    The raw bytes we've received from the scanner. This propery is an array containing one or more `Uint8Array`'s.

#### Parsed GS1 data

The `data` property is optional, but if GS1 data is detected, it will contain an object with the following properties:

-   `gtin`<br>
    Optionally, if the GS1 elements define a GTIN, it will be listed here for quick reference.
-   `elements`<br>
    An array of all the GS1 elements that the barcode contains. Each element is an object with the folowing properties; `ai`: the appication identifier, `label`: a human readable label and `value`: the value of the element.

#### Symbologies

The `symbology` property can be any of the following common values for 1D barcodes:

`ean8`, `ean13`, `upca`, `upce`, `code39`, `code93`, `code128`, `codabar`, `interleaved-2-of-5`, `gs1-databar-omni`, `gs1-databar-expanded`

Or these 2D barcodes:

`qr-code`, `data-matrix`, `aztec-code`, `pdf417`

#### Example

A typical EAN 13 barcode would look like:

```js
{
    value: "3046920029759",
    symbology: "ean13",
    guess: false,
    data: {
        gtin: "03046920029759",
        elements: [{
            ai: "01",
            label: "GTIN",
            value: "03046920029759"
        }]
    },
    bytes: [[
        0x30, 0x33, 0x30, 0x34, 0x36, 0x39, 0x32, 0x30, 
        0x30, 0x32, 0x1D, 0x37, 0x35, 0x39
    ]]
}
```
<br>

-----

<br>

This library has been created by Niels Leenheer under the [MIT license](LICENSE). Feel free to use it in your products. The development of this library is sponsored by Salonhub.

<a href="https://salonhub.nl"><img src="https://salonhub.nl/assets/images/salonhub.svg" width=140></a>
