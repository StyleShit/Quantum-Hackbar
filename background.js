/**
 * Background script to handle POST data & Referer
 */

var postData = [];
var referer = [];
var headers = [];


// get POST data for each loaded page
browser.webRequest.onBeforeRequest.addListener(
    getPostData,
    { urls: ['<all_urls>'], types: ['main_frame'] }, 
    ['requestBody']
);


// add/modify headers before sending request
browser.webRequest.onBeforeSendHeaders.addListener(
    rewriteHeaders,
    { urls: ["<all_urls>"], types: ["main_frame"] },
    ["blocking", "requestHeaders"]
);


// get referer for each page loaded
browser.webRequest.onSendHeaders.addListener(
    getReferer,
    { urls: ["<all_urls>"], types: ["main_frame"] },
    ["requestHeaders"]
);


// listen to messages from devtools panel
browser.runtime.onMessage.addListener( ( message, sender, sendResponse ) => {

    switch( message.action )
    {
        // return POST data to devtools panel
        case 'getPostData':
            getCurrentTab().then( tab => {
                sendResponse({
                    postData: postData[tab.id] ? postData[tab.id] : ''
                });
            });
            break;

        // return referer to devtools panel
        case 'getReferer':
            getCurrentTab().then( tab => {
                sendResponse({
                    referer: referer[tab.id] ? referer[tab.id] : ''
                });
            });
            break;

        // add/modify header
        case 'addHeader':
            headers.push({
                name: message.headerName,
                value: message.headerValue
            });
            break;

        default:
            break;
    }

    return true;

});


// get POST data on page load
function getPostData( e )
{
    getCurrentTab().then( tab => {

        if( e.method == 'POST' )
            postData[tab.id] = e.requestBody.formData;

        else
            postData[tab.id] = '';
    });
}


// get referer on page load
function getReferer( e )
{
    getCurrentTab().then( tab => {

        for( let h of e.requestHeaders )
        {
            if( h.name == 'Referer' )
            {
                referer[tab.id] = h.value;
                return;
            }
        }

        referer[tab.id] = '';
    });
}


// add/modify headers
function rewriteHeaders( e )
{
    if( headers.length == 0 )
        return;

    // push headers to request
    for( let h of headers )
        e.requestHeaders.push( h );

    // reset headers array
    headers = [];

    // modify headers
    return { 
        requestHeaders: e.requestHeaders 
    };
}


// get current tab
function getCurrentTab()
{
    return new Promise( ( resolve, reject ) => {
        browser.tabs.query({ currentWindow: true, active: true }).then( tabs => {

            if( tabs.length > 0 )
                resolve( tabs[0] );

            else
                reject( 'Can\'t get tab' );
        });
    });
}