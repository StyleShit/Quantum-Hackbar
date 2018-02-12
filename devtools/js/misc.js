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


// hide hovered menu element after clicking
function unhover()
{
    let el = _( '.dropdown-menu' );

    el.style.pointerEvents = 'none';
    setTimeout( () => {
        el.style.pointerEvents = '';
    }, 500 );
}


// attach function to click event of given elements
function listenClicks( elements )
{
    elements.forEach( el => {
        _( el.el ).addEventListener( 'click', ( e ) => {
            el.func();
            unhover();
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
        loadPostData();
        loadReferer();
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


// get POST data of current page from background script
function loadPostData()
{
    let sending = browser.runtime.sendMessage({
        action: 'getPostData'
    });
    
    sending.then(
        
        response => {
            let postData = [];

            // iterate over post object
            for( var obj in response.postData )
            {
                if( !response.postData.hasOwnProperty( obj ) )
                    continue;

                postData.push( obj + '=' + response.postData[obj][0] );
            }

            postDataInput.value = postData.join( '&' );
        },

        error => {
            console.error( error );
        }

    );
}


// get referer of current page from background script
function loadReferer()
{
    let sending = browser.runtime.sendMessage({
        action: 'getReferer'
    });
    
    sending.then(
        
        response => {
            refererInput.value = response.referer
        },

        error => {
            console.error( error );
        }

    );
}


// execute payload from the input
function executePayload()
{
    let URL = removeNewLines( payloadInput.value );

    URL = encodeURI( URL );
    URL = URL.replace( /\#/g, '%23' );

    // add referer
    if( toggleReferer.checked )
        addHeader( 'Referer', refererInput.value );

    // Execute regular GET
    if( !togglePostData.checked )
        executeGetPayload( URL );

    // Execute POST
    else
        executePostPayload( URL );
}


// execute a simple GET payload
function executeGetPayload( URL )
{
    exec( 'window.location.href = "' + URL + '"' ).then( () => {
        // focus the input again for comfort
        // TODO: not working. fix that...
        setTimeout( () => { payloadInput.focus() }, 100 );
    });
}


// execute POST payload
function executePostPayload( URL )
{
    // generate random form id
    let formID = 'quantum-hackbar-' + parseInt( Math.random()*10001 );
    let form = '<form id="' + formID + '" method="post" action="' + URL + '">';

    // parse POST fields from input
    let postFields = [];
    let postData = removeNewLines( postDataInput.value );
    postData = postData.split( '&' );

    postData.forEach( obj => {

        obj = obj.split( '=' );

        postFields.push({
            field: obj[0],
            value: obj[1] ? obj[1] : '',
        });
    });

    // append POST inputs to form
    postFields.forEach( obj => {;
        form += '<input type="hidden" name="' + obj.field + '" value="' + obj.value + '" />';
    });

    form += '</form>';

    // append form to page & submit it
    exec( 'document.body.innerHTML += \'' + form + '\'' );
    exec( 'document.querySelector( "#'+formID+'" ).submit()' );
}


// add header to request
function addHeader( name, value )
{
    browser.runtime.sendMessage({
        action: 'addHeader',
        headerName: name,
        headerValue: value
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


// add slashes
function addSlashes()
{
    let str = getSelectedText();
    
    if( str != false )
    {
        str = str.replace( /\\/g, '\\\\' );
        str = str.replace( /\'/g, "\\'" );
        str = str.replace( /\"/g, '\\"' );
        
        addToPayload( str );
    }
}


// strip slashes
function stripSlashes()
{
    let str = getSelectedText();
    
    if( str != false )
    {
        str = str.replace( /\\'/g, '\'' );
        str = str.replace( /\\"/g, '"' );
        str = str.replace( /\\\\/g, '\\' );
        
        addToPayload( str );
    }
}


// strip spaces
function stripSpaces()
{
    let str = getSelectedText();
    
    if( str != false )
    {
        str = str.replace( /\s+/g, '' );
        
        addToPayload( str );
    }
}


// reverse string chars
function reverseString()
{
    let str = getSelectedText();
    
    if( str != false )
    {
        str = str.split( '' );
        str = str.reverse();
        str = str.join( '' );
        
        addToPayload( str );
    }
}


// remove new lines from string
function removeNewLines( str )
{
    return str.replace( /(\n|\r|\r\n)/g, '' );
}