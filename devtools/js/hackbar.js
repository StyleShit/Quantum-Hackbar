/**
 * Global Variables
 */

let payloadInput = _( '.payload' );

/**
 * Click listeners
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
    { el: '.convert-using-utf-8-btn', func: () => { SQLCHAR( 'utf-8' ) } },
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
    { el: '.rot13-hash-btn', func: () => { encrypt( 'rot13' ) } }
    
]

listenClicks( actionButtons );