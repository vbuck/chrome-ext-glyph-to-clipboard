/**
 * Canvas Adapter
 *
 * An interface for the canvas rendering scene.
 * Used to convert a given DOM text selection to an input for the scene.
 */

class AppCanvasAdapter {
    /**
     * @param {AppCanvas|null} canvas
     */
    constructor(canvas = null) {
        this.canvas = canvas ? canvas : new AppCanvas();
    }

    /**
     * @param {Selection} selection
     * @param {Boolean} trim
     * @param {Number} scale
     */
    copy(selection, trim = true, scale = 1) {
        if (!(selection instanceof Selection) || !selection.rangeCount) {
            return console.error('Cannot render because the selected text range is invalid.');
        }

        let context = selection.getRangeAt(0).startContainer.parentNode,
            style = window.getComputedStyle(context);

        this.canvas.resize(context.offsetWidth, context.offsetHeight);
        this.canvas.render(
            selection.toString(),
            (parseInt(style.getPropertyValue('font-size'), 10) * scale).toString() + 'px',
            style.getPropertyValue('font-weight'),
            style.getPropertyValue('color'),
            style.getPropertyValue('font-family'),
            trim
        );

        this.canvas.export(function (result) {
            navigator.clipboard.write(
                [
                    new ClipboardItem({'image/png': result})
                ]
            );

            console.log('Copied selection image to clipboard.');
        });
    }
}
