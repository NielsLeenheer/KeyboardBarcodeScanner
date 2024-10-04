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

One other note, while most barcode scanners type very quickly for a human, it is quite slow for computers. If you scan are very large 2d barcode it may take a second or two before the scanner is finished typing. If you want your application to respond faster, you may be able to enable serial mode or HID mode for your barcode scanner and use one of the sister libraries: [WebHidBarcodeScanner](https://github.com/NielsLeenheer/WebHidBarcodeScanner) or [WebSerialBarcodeScanner](https://github.com/NielsLeenheer/WebSerialBarcodeScanner)

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

Because the barcodes are `typed` by the scanner, we can not get any information about the symbology, only the data of the barcode itself. However the library can make an educated guess based on the content. For example, if it starts with `http` it usually is a QR code. If it is 13 digits, it is usually an EAN13 code and 12 is usually a UPC-A. 

By default this behaviour is turned off. If you want this library to guess the symbology you can turn it on:

```js
const barcodeScanner = new KeyboardBarcodeScanner({
    guessSymbology: true
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
-   `symbology`<br>
    Optionally a library specific identifier of the symbology. 


<br>

-----

<br>

This library has been created by Niels Leenheer under the [MIT license](LICENSE). Feel free to use it in your products. The  development of this library is sponsored by Salonhub.

<a href="https://salohub.nl"><img src="https://salonhub.nl/assets/images/salonhub.svg" width=140></a>
