# KeyboardBarcodeScanner

This is an library that allows you to use handheld barcode scanners in keyboard emulation mode. Most barcode scanners use this mode by default.

## What does this library do?

By default most barcode scanners emulate a keyboard meaning all numbers and letters of a barcode will be individually 'typed' by the barcodescanner. This library will listen to global keyboard events and try to seperate out digits and letters from barcodes from other digits and letters that are being typed on the keyboard. 

## How to use it?

Load the `keyboard-barcode-scanner.umd.js` file in the browser and instantiate a `KeyboardBarcodeScanner` object. 

    <script src='keyboard-barcode-scanner.umd.js'></script>

    <script>

        const barcodeScanner = new KeyboardBarcodeScanner();

    </script>


Or import the `keyboard-barcode-scanner.esm.js` module:

    import KeyboardBarcodeScanner from 'keyboard-barcode-scanner.esm.js';

    const barcodeScanner = new KeyboardBarcodeScanner();


## Connect to a scanner

The first time you have to manually connect to the barcode scanner by calling the `connect()` function. 

    barcodeScanner.connect();

To find out when a barcode scanner is connected you can listen for the `connected` event using the `addEventListener()` function.

    barcodeScanner.addEventListener('connected', device => {
        console.log(`Connected to barcode scanner in keyboard emulation mode`);
    });

The callback of the `connected` event is passed an object with the following properties:

-   `type`<br>
    Type of the connection that is used, in this case it is always `keyboard`.

To find out when a barcode scanner is disconnected you can listen for the `disconnected` event using the `addEventListener()` function.

    barcodeScanner.addEventListener('disconnected', () => {
        console.log(`Disconnected`);
    });


## Configuration

Because the barcodes are `typed` by the scanner, we can not get any information about the symbology, only the data of the barcode itself. However the library can make an educated guess based on the content. For example, if it starts with `http` it usually is a QR code. If it is 13 digits, it is usually an EAN13 code and 12 is usually a UPCA. 

By default this behaviour is turned off. If you want this library to guess the symbology you can turn it on:

    const barcodeScanner = new KeyboardBarcodeScanner({
        guessSymbology: true
    });


## Events

Once connected you can use listen for the following events to receive data from the barcode scanner.

### Scanning barcodes

Whenever the libary detects a barcode, it will send out a `barcode` event that you can listen for.

    barcodeScanner.addEventListener('barcode', e => {
        console.log(`Found barcode ${e.value} with symbology ${e.symbology}`);
    });

The callback is passed an object with the following properties:

-   `value`<br>
    The value of the barcode as a string
-   `symbology`<br>
    Optionally a library specific identifier of the symbology. 

## License

MIT
