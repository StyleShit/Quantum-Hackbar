/**
 * Background script to handle POST data & Referer
 */

var postData = '';
var referer = '';
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
            sendResponse({
                postData: postData
            });
            break;

        // return referer to devtools panel
        case 'getReferer':
            sendResponse({
                referer: referer
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

});


// get POST data on page load
function getPostData( e )
{
    if( e.method == 'POST' )
        postData = e.requestBody.formData;

    else
        postData = '';
}


// get referer on page load
function getReferer( e )
{
    for( let h of e.requestHeaders )
    {
        if( h.name == 'Referer' )
        {
            referer = h.value;
            return;
        }
    }

    referer = '';
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