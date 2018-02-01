/**
 * Global Variables
 */

 var payloadInput = _( '.payload' );

/**
 * Click listeners
 */

let actionButtons = [
    { el: '.load-url-btn', func: loadURL },
    { el: '.split-url-btn' , func: splitURL },
    { el: '.execute-payload-btn' , func: executePayload },
    { el: '.basic-info-column-btn' , func: basicInfoColum },
    { el: '.union-select-statement-btn' , func: unionSelectStatement },
    { el: '.spaces-to-inline-comments-btn', func: spacesToInlineComments  }
]

listenClicks( actionButtons );

/**
 * Functions
 */
function _( el )
{
    return document.querySelector( el );
}

function __( el )
{
    return document.querySelectorAll( el );
}

function listenClicks( elements )
{
    elements.forEach( el => {
        _( el.el ).addEventListener( 'click', ( e ) => {
            el.func();
        });
    });
}

function exec( cmd )
{
    // console.log( browser.devtools.inspectedWindow );
    // browser.tabs.sendMessage( tabs[0].id, {
    //     command: cmd
    // });

    // browser.runtime.sendMessage({
    //     tabId: browser.devtools.inspectedWindow.tabId,
    //     script: code
    // });
    return browser.devtools.inspectedWindow.eval( cmd );
}

function loadURL()
{
    exec( 'window.location.href' ).then( URL => {
        URL = URL.slice( 0, -1 );
        payloadInput.value = URL;
    });
}

function splitURL()
{
    let URL =  payloadInput.value;
    URL = URL.replace( /\?/, '\n?' );
    URL = URL.replace( /\&/g, '\n&' );

    payloadInput.value = URL;
}

function executePayload()
{
    let URL =  payloadInput.value;
    exec( 'window.location.href = "' + URL + '"' ).then( () => {
        // nothing
    });
}

function addToPayload( data )
{
    payloadInput.value += data;
}

function basicInfoColum()
{
    addToPayload( 'CONCAT(user(),"::",database(),"::",version())' );
}

function unionSelectStatement()
{
    let out = 'UNION SELECT ';
    
    exec( 'prompt( "How many columns?", 10 )' ).then( columns => {
        columns = parseInt( columns );

        for( let i=1; i<=columns; i++ )
            out += i + ',';

        out = out.slice( 0, -1 );
        addToPayload( out );
    });
}

function spacesToInlineComments()
{
    payloadInput.value = payloadInput.value.replace( /\s+/g, '/**/' );
}