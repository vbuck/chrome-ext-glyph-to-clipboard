const contextMenuItemParentId = 'chrome-ext-glyph-to-clipboard';
const contextMenuItems = [
    {
        id: contextMenuItemParentId,
        title: 'Glyph-to-Clipboard',
        contexts: ['selection']
    },
    {
        id: contextMenuItemParentId + '-original',
        parentId: contextMenuItemParentId,
        title: 'At Current Size',
        contexts: ['selection']
    },
    {
        id: contextMenuItemParentId + '-@0.5x',
        parentId: contextMenuItemParentId,
        title: 'At Half-Size',
        contexts: ['selection']
    },
    {
        id: contextMenuItemParentId + '-@2x',
        parentId: contextMenuItemParentId,
        title: 'At Double-Size',
        contexts: ['selection']
    },
    {
        id: contextMenuItemParentId + '-@5x',
        parentId: contextMenuItemParentId,
        title: 'At 5x',
        contexts: ['selection']
    }
];

chrome.runtime.onInstalled.addListener(function () {
    contextMenuItems.forEach(function (item) {
        chrome.contextMenus.create(item);
    })
});

chrome.contextMenus.onClicked.addListener(function (eventData) {
        if (eventData.parentMenuItemId === contextMenuItemParentId) {
            chrome.tabs.query(
                { active: true, currentWindow: true },
                function (tabs) {
                    chrome.tabs.sendMessage(
                        tabs[0].id,
                        {
                            action: 'get-selection',
                            size: parseFloat(eventData.menuItemId.split('@').pop()) || 1
                        }
                    );
                }
            );
        }
    }
);
