/**
 * Misc Functions
 */

 // get single element by CSS selector
function _( el )
{
    return document.querySelector( el );
}


// get all elements that match CSS selector
function __( el )
{
    return document.querySelectorAll( el );
}


// attach function to click event of given elements
function listenClicks( elements )
{
    elements.forEach( el => {
        _( el.el ).addEventListener( 'click', ( e ) => {
            el.func();
        });
    });
}


// execute code in the current tab
function exec( cmd )
{
    return browser.devtools.inspectedWindow.eval( cmd );
}


// load current URL into the payload input
function loadURL()
{
    exec( 'window.location.href' ).then( URL => {
        URL = URL.slice( 0, -1 );
        payloadInput.value = decodeURI( URL );
    });
}


// split the paypload URL by its get parameters
function splitURL()
{
    let URL =  payloadInput.value;
    URL = URL.replace( /\?/, '\n?' );
    URL = URL.replace( /\&/g, '\n&' );

    payloadInput.value = URL;
}


// execute payload from the input
function executePayload()
{
    let URL = payloadInput.value.replace( /(\n|\r|\r\n)/g, '' );
    URL = encodeURI( URL );
    URL = URL.replace( /\#/g, '%23' );

    exec( 'window.location.href = "' + URL + '"' ).then( () => {
        // focus the input again for comfort
        // TODO: not working. fix that...
        setTimeout( () => { payloadInput.focus() }, 100 );
    });
}


// add value to payload
function addToPayload( data )
{
    /**
     * Source: https://stackoverflow.com/a/11077016/3829526
     */

    if( payloadInput.selectionStart || payloadInput.selectionStart == '0' )
    {
        let startPos = payloadInput.selectionStart;
        let endPos = payloadInput.selectionEnd;

        payloadInput.value = payloadInput.value.substring( 0, startPos )
            + data
            + payloadInput.value.substring( endPos, payloadInput.value.length );
    } 
    
    else
        payloadInput.value += data;
}


// get selected text
function getSelectedText() 
{
    let selectionStart = payloadInput.selectionStart;
    let selectionEnd = payloadInput.selectionEnd;
    if ( selectionEnd - selectionStart < 1 ) 
    {
        exec( 'alert( "Select text before using this function!" );' )
            .then(function ( result, isException ) {
                // nothing
            });

        return false;
    }

    return payloadInput.value.substr( selectionStart, selectionEnd - selectionStart );
}


// set selected text
function setSelectedText( str )
{
    let selectionStart = payloadInput.selectionStart;
    let selectionEnd = payloadInput.selectionEnd;
    let pre = payloadInput.value.substr( 0, selectionStart );
    let post = payloadInput.value.substr( selectionEnd, payloadInput.value.length );

    payloadInput.value = pre + str + post;
    payloadInput.selectionStart = selectionStart;
    payloadInput.selectionEnd = selectionStart + str.length;
}