/**
 * Background script to handle POST data & Referer
 */

var postData = '';

// get POST data for each loaded page
browser.webRequest.onBeforeRequest.addListener(
    getPostData,
    { urls: ['<all_urls>'], types: ['main_frame'] }, 
    ['requestBody']
);


// get POST data on page load
function getPostData( e )
{
    if( e.method == 'POST' )
        postData = e.requestBody.formData;

    else
        postData = '';
}


// return POST data when asked from devtools
browser.runtime.onMessage.addListener( ( message, sender, sendResponse ) => {
    if( message.action == 'getPostData' )
        sendResponse( { postData: postData } );
});