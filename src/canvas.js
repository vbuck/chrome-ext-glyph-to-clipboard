/**
 * Canvas Application
 *
 * A simple class for rendering text scenes.
 */

class AppCanvas {
    constructor(element = null) {
        this.reset(element);
    }

    reset(element = null, width = 256, height = 256) {
        if (element) {
            if (!(element instanceof HTMLCanvasElement)) {
                return console.error('Cannot initialize canvas because supplied element is not valid.');
            }
        } else {
            element = document.createElement('canvas');
        }

        this.canvas = element;
        this.context = this.canvas.getContext('2d');

        if (width) {
            this.canvas.width = width;
        }

        if (height) {
            this.canvas.height = height;
        }
    }

    resize(width, height) {
        if (!width || !height) {
            return console.error('You must specify both width and height to resize the canvas.');
        }

        this.canvas.width = width;
        this.canvas.height = height;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render(glyph, size = '24px', color = '#000', font = 'sans-serif', trim = true) {
        this.clear();

        let style = {
            'font': size + ' ' + font,
            'fillStyle': color,
            'textBaseline': 'top',
            'canvasWidth': this.canvas.width,
            'canvasHeight': this.canvas.height,
            'computedSize': parseInt(size, 10),
            'offsetLeft': Math.floor((this.canvas.width / 2) - (parseInt(size, 10) / 2)),
            'offsetTop': Math.floor((this.canvas.height / 2) - (parseInt(size, 10) / 2))
        };

        console.log('Performing render', glyph, style);

        if (trim) {
            this.resize(
                (style.computedSize * glyph.length) + 2,
                style.computedSize + 2
            );

            style.offsetLeft = 1;
            style.offsetTop = 1;
        }

        this.context.font = style.font;
        this.context.fillStyle = style.fillStyle;
        this.context.textBaseline = style.textBaseline;
        this.context.fillText(glyph, style.offsetLeft, style.offsetTop);
    }

    export(callback) {
        this.canvas.toBlob(callback, 'image/png', 1);
    }
}
