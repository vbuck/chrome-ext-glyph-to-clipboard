const adapter = new AppCanvasAdapter();

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    if (!response || !('action' in response)) {
        return;
    }

    switch (response.action) {
        case 'get-selection':
            let selection = document.getSelection();

            if (selection) {
                adapter.copy(selection, true, response.size || 1);
            } else {
                alert('Unable to copy to clipboard because no contents were selected.');
            }
            break;
        default:
            break;
    }
});
