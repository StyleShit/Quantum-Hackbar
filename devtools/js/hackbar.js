/**
 * Global Variables
 */

let payloadInput = _( '.payload' );
let postDataInput = _( '.post-data' );
let refererInput = _( '.referer' );
let togglePostData = _( '#toggle-post-data' );
let toggleReferer = _( '#toggle-referer' );
let activeInput = payloadInput;


/**
 * Event listeners
 */

let actionButtons = [

    /** Actions */
    { el: '.load-url-btn', func: loadURL },
    { el: '.split-url-btn' , func: splitURL },
    { el: '.execute-payload-btn' , func: executePayload },

    /** SQL */
    { el: '.basic-info-column-btn' , func: basicInfoColum },
    { el: '.union-select-statement-btn' , func: unionSelectStatement },
    { el: '.spaces-to-inline-comments-btn', func: spacesToInlineComments },
    { el: '.convert-using-utf-8-btn', func: () => { mysqlConvert( 'utf-8' ) } },
    { el: '.convert-using-latin-btn', func: () => { mysqlConvert( 'latin1' ) } },
    { el: '.mysql-char-btn', func: () => { SQLCHAR( 'mysql' ) } },
    { el: '.mssql-char-btn', func: () => { SQLCHAR( 'mssql' ) } },
    { el: '.oracle-char-btn', func: () => { SQLCHAR( 'oracle' ) } },

    /** XSS */
    { el: '.xss-from-char-code-btn', func: stringFromCharCode },
    { el: '.xss-html-characters-btn', func: htmlCharacters },
    { el: '.xss-alert-statement-btn', func: xssAlertStatement },

    /** Encryption */
    { el: '.md5-hash-btn', func: () => { encrypt( 'md5' ) } },
    { el: '.sha1-hash-btn', func: () => { encrypt( 'sha1' ) } },
    { el: '.sha256-hash-btn', func: () => { encrypt( 'sha256' ) } },
    { el: '.rot13-hash-btn', func: () => { encrypt( 'rot13' ) } },

    /** Encoding */
    { el: '.base64-encode-btn', func: base64Encode },
    { el: '.base64-decode-btn', func: base64Decode },
    { el: '.url-encode-btn', func: urlEncode },
    { el: '.url-decode-btn', func: urlDecode },

    /** Others */
    { el: '.addslashes-btn', func: addSlashes },
    { el: '.stripslashes-btn', func: stripSlashes },
    { el: '.strip-spaces-btn', func: stripSpaces },
    { el: '.reverse-string-btn', func: reverseString }
]

listenClicks( actionButtons );


// show or hide inputs on toggle change
let toggles = [
    { toggle: togglePostData, input: postDataInput },
    { toggle: toggleReferer, input: refererInput }
];

for( let t of toggles )
{
    t.toggle.addEventListener( 'change', e => {

        if( e.target.checked )
            t.input.classList.remove( 'hidden' );
    
        else
            t.input.classList.add( 'hidden' );
    });
}


// set active input as the active input
__( '.text-box' ).forEach( input => {
    input.addEventListener( 'focus', e => {
        activeInput = e.target;
    });
});