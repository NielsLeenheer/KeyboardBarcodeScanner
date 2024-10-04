import EventEmitter from './event-emitter.js';
import SymbologyDetector from './symbology-detector.js';

class KeyboardBarcodeScanner {

    #options;
    #internal;

	constructor(options) {
        this.#options = Object.assign({
            guessSymbology: false,
            debug: false
        }, options || {})

        this.#internal = {
            keydown:        this.#keydown.bind(this),
            interval:       null,
            emitter:        new EventEmitter(),
            buffer:         '',
            timestamp:      0,
        };

	}

	async connect() {
        this.#open();
	}

	async reconnect() {
        this.#open();
	}

	async disconnect() {
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

        /* Optional: Clear buffer on NumLock */

        if (e.key === 'Clear' && e.code === 'NumLock') {
            this.#internal.buffer = '';
            this.#internal.timestamp = e.timeStamp;
            return;
        }

        /* Parse buffer on timeout */

        if (e.timeStamp - this.#internal.timestamp > 30) {
            this.#parse(this.#internal.buffer);
            this.#internal.buffer = '';
        }

        /* Append key to buffer */

        if (e.key.length === 1) {
            this.#internal.buffer += e.key;
        }

        this.#internal.timestamp = e.timeStamp;
    }

    #check() {
        if (this.#internal.buffer.length === 0) {
            return;
        }

        if (performance.now() - this.#internal.timestamp > 50) {
            this.#parse(this.#internal.buffer);
            this.#internal.buffer = '';
        }
    }

    #parse(buffer) {
        if (buffer.length > 6) {
            
            let data = {
                value: buffer
            };

            /* Try to guess the symbology */

            if (this.#options.guessSymbology) {
                let symbology = SymbologyDetector.detect(buffer);

                if (symbology) {
                    data.symbology = symbology;
                    data.guess = true;
                }
            }

            this.#internal.emitter.emit('barcode', data);
        }
    }

	addEventListener(n, f) {
		this.#internal.emitter.on(n, f);
	}
}

export default KeyboardBarcodeScanner;