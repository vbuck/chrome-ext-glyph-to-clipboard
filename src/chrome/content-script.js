const adapter = new AppCanvasAdapter();

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    if (!response || !('action' in response)) {
        return;
    }

    switch (response.action) {
        case 'get-selection':
            adapter.copy(document.getSelection());
            break;
        default:
            break;
    }
});
