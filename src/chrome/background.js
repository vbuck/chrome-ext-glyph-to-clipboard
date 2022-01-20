const contextMenuItemId = 'chrome-ext-glyph-to-clipboard';

chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: contextMenuItemId,
        title: 'Glyph-to-Clipboard',
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener(function (eventData) {
        if (eventData.menuItemId === contextMenuItemId) {
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        { action: 'get-selection' }
                    );
                }
            );
        }
    }
);
