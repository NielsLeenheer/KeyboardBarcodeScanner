import EventEmitter from './event-emitter.js';
import { Aim, GS1, Detector } from '@point-of-sale/barcode-parser';

class KeyboardBarcodeScanner {

    #options;
    #internal;

    /* 
        Time between keystrokes for common barcode scanners:

        Netum NSL-5:                6ms
        Netum NSC750:               19ms
        Honeywell HF680:            10ms
        Honeywell Voyager 1400g:    10ms
        Datalogic BC2090:           1ms

    */

    #timeBetweenKeystrokes = 40;

    /* 
        Our timeout needs to be set quite conservatively,
        because the browser may not be able to keep up with
        the barcode scanner and may pause events for a couple
        of tens of ms.
    */

    #timeoutAfterLastKeystroke = 200;



	constructor(options) {
        this.#options = Object.assign({
            debug: false,
            timing: 'auto',
            guessSymbology: false,
            allowedSymbologies: [],
        }, options || {})

        this.#internal = {
            state:          'unknown',
            command:        [],
            keydown:        this.#keydown.bind(this),
            interval:       null,
            timeout:        null,
            emitter:        new EventEmitter(),
            buffer:         [],
            keystrokes:     0,
            events:         [],
            timestamp:      {
                first:      null,
                last:       null
            },
        };

        if (this.#options.timing !== 'auto' && typeof this.#options.timing === 'number') {
            this.#timeBetweenKeystrokes = this.#options.timing
            this.#timeoutAfterLastKeystroke = this.#options.timing * 5;
        }
	}

	async connect() {
        this.#open();
	}

	async reconnect() {
        this.#open();
	}

	async disconnect() {
        this.#close();
	}

	async #open() {
        document.addEventListener('keydown', this.#internal.keydown);
        this.#internal.interval = setInterval(() => this.#check(), 50);

        this.#internal.emitter.emit('connected', {
            type:       'keyboard'
        });
    }

    async #close() {
        document.removeEventListener('keydown', this.#internal.keydown);
        clearInterval(this.#internal.interval);

        this.#internal.emitter.emit('disconnected');
    }

    #keydown(e) {
        let now = performance.now();

        /* Do not process if the event target is a form field */

        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        /* Prevent this keydown from reaching the browser when we're in data or command mode */

        if (this.#internal.state !== 'unknown') {
            e.stopPropagation();
            e.preventDefault();    
        }

        if (this.#options.debug) {
           console.log(e);
        }

        /* Set the starting timestamp for this - perhaps series of - keydown events */

        if (this.#internal.timestamp.first === null) {
            this.#internal.timestamp.first = now; // e.timeStamp;
        }

        /* Parse buffer on timeout */

        if (this.#internal.keystrokes > 1 && this.#internal.state === 'unknown') {
            if (now - this.#internal.timestamp.last > this.#timeBetweenKeystrokes) {
                if (this.#options.debug) {
                    console.log(`forcing parse because ${this.#timeBetweenKeystrokes}ms since last keydown`, now, this.#internal.timestamp.last, now - this.#internal.timestamp.last);
                }

                this.#internal.events.push({
                    type: 'label',
                    label: 'Slowdown',
                    time: performance.now()
                });

                this.#parse(this.#internal.buffer);
                this.#reset();
            }
        }

        /* If we've received more than 2 keystrokes in less than 30ms each, we're in data mode */

        if (this.#internal.keystrokes > 2 && this.#internal.state === 'unknown') {
            if (now - this.#internal.timestamp.first < this.#internal.keystrokes * 30) {
                this.#internal.state = 'data';
            }
        }

        this.#internal.events.push({
            type: 'keydown',
            time: now,
            key: e.key,
            code: e.code,
            state: this.#internal.state
        });


        /* Intercept commands */

        if (e.key === 'Clear' && e.code === 'NumLock') {

            if (this.#internal.state !== 'command') {
                this.#internal.state = 'command';
            }

            else if (this.#internal.state === 'command') {
                this.#command();
                this.#internal.state = 'data';
            }

            if (this.#internal.buffer.length > 0) {
                this.#internal.keystrokes++;
                this.#internal.timestamp.last = now;
            }

            return;
        }

        /* Append key to buffer */

        if (this.#internal.state === 'unknown' || this.#internal.state === 'data') {

            /* Just a regular keypress */

            if (e.key.length === 1 && !e.ctrlKey) {
                this.#internal.buffer.push(e.key.charCodeAt(0));
            }

            /* Handle Ctrl + X key modifiers */

            else if (e.key.length === 1 && e.ctrlKey) {
                let value = e.key.toUpperCase().charCodeAt(0) - 0x40;                
                this.#internal.buffer.push(value);
            }

            /* Special keys */
            
            else {
                let keyMapping = {
                    'Enter':    0x0d,
                    'Tab':      0x09,
                    'Escape:':  0x1b
                }

                if (keyMapping[e.key]) {
                    this.#internal.buffer.push(keyMapping[e.key]);
                }
            }
        }
        else {
            this.#internal.command.push({ key: e.key, code: e.code });
        }

        this.#internal.keystrokes++;
        this.#internal.timestamp.last = now;


        if (this.#internal.timeout) {
            clearTimeout(this.#internal.timeout);
        }

        this.#internal.timeout = setTimeout(() => {
            this.#internal.emitter.emit('debug', {
                events: this.#internal.events
            });

            this.#internal.events = [];
        }, 500)
    }

    #check() {
        let now = performance.now();

        if (this.#internal.buffer.length === 0) {
            return;
        }

        if (now - this.#internal.timestamp.last > this.#timeoutAfterLastKeystroke) {
            if (this.#options.debug) {
                console.log(`forcing parse because ${this.#timeoutAfterLastKeystroke}ms have passed`, now, this.#internal.timestamp.last, now - this.#internal.timestamp.last);
            }

            this.#internal.events.push({
                type: 'label',
                label: 'Timeout',
                time: performance.now()
            });

            this.#parse(this.#internal.buffer);
            this.#reset();
        }
    }

    #command() {
        if (this.#internal.command.length === 0) {
            return;
        }

        let command = this.#internal.command.shift();

        if (command.code == 'AltLeft') {
            let payload = this.#internal.command.map(c => c.key).join('');
            this.#internal.buffer.push(parseInt(payload, 10));
        }

        this.#internal.command = [];
    }

    #parse(buffer) {
        let now = performance.now();

        this.#internal.events.push({
            type: 'label',
            label: buffer.length > 4 ? 'Parsing' : 'Rejecting',
            class: buffer.length > 4 ? 'success' : 'error',
            time: now,
            buffer
        });
        
        if (buffer.length > 4) {
            if (this.#options.debug) {
                console.log(
                    `received ${this.#internal.keystrokes} keystrokes in ${parseInt(this.#internal.timestamp.last - this.#internal.timestamp.first, 10)}ms, ` + 
                    `that is an average of ${parseInt((this.#internal.timestamp.last - this.#internal.timestamp.first) / this.#internal.keystrokes, 10)}ms per keystroke`
                );
            }

            let result = {
                value: String.fromCharCode.apply(null, buffer),
                bytes: [
                    new Uint8Array(buffer)
                ]
            };

            /* If the last character of value is a carriage return, linefeed or tab, remove it */

            while (result.value.endsWith('\n') || result.value.endsWith('\r') || result.value.endsWith('\t')) {
                result.value = result.value.slice(0, -1);
            }

            /* Check if we have and AIM identifier */

            if (result.value.startsWith(']')) {
                let aim = Aim.decode(result.value.substr(0, 3), result.value.substr(3));

                if (aim) {
                    result.aim = result.value.substr(0, 3);
                    result.symbology = aim;
                }

                result.value = result.value.substr(3);
            }

            /* Otherwise try to guess the symbology */

            else if (this.#options.guessSymbology) {
                let detected = Detector.detect(result.value);

                if (detected) {
                    result = Object.assign(result, detected);
                }
            }

            if (this.#options.debug) {
                console.log('Result', result);
            }

            /* Decode GS1 data */

            let parsed = GS1.parse(result);
            if (parsed) {
                result.data = parsed;
            }

            if (this.#options.debug) {
                console.log('GS1', result);
            }

            /* Emit the barcode event */

            if (this.#options.allowedSymbologies.length === 0 ||
                this.#options.allowedSymbologies.includes(result.symbology)) 
            {
                this.#internal.emitter.emit('barcode', result);
            }
        }
    }

    #reset() {
        this.#internal.buffer = [];
        this.#internal.command = [];
        this.#internal.state = 'unknown';
        this.#internal.keystrokes = 0;
        this.#internal.timestamp = {
            first:      null,
            last:       null
        };
    }

	addEventListener(n, f) {
		this.#internal.emitter.on(n, f);
	}
}

export default KeyboardBarcodeScanner;