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
        payloadInput.value = URL;
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
    let URL =  payloadInput.value;
    exec( 'window.location.href = "' + URL + '"' ).then( () => {
        // nothing
    });
}


// add value to payload
// TODO: add the value in the current position of the cursor
function addToPayload( data )
{
    payloadInput.value += data;
}