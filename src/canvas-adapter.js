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
     */
    copy(selection, trim = true) {
        if (!(selection instanceof Selection) || !selection.rangeCount) {
            return console.error('Cannot render because the selected text range is invalid.');
        }

        let context = selection.getRangeAt(0).startContainer.parentNode,
            style = window.getComputedStyle(context);

        this.canvas.resize(context.offsetWidth, context.offsetHeight);
        this.canvas.render(
            selection.toString(),
            style.getPropertyValue('font-size'),
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
