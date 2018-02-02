/**
 * Global Variables
 */

let payloadInput = _( '.payload' );

/**
 * Click listeners
 */

let actionButtons = [
    { el: '.load-url-btn', func: loadURL },
    { el: '.split-url-btn' , func: splitURL },
    { el: '.execute-payload-btn' , func: executePayload },
    { el: '.basic-info-column-btn' , func: basicInfoColum },
    { el: '.union-select-statement-btn' , func: unionSelectStatement },
    { el: '.spaces-to-inline-comments-btn', func: spacesToInlineComments  },
    { el: '.convert-using-utf-8-btn', func: () => { SQLCHAR( 'utf-8' ) }  },
    { el: '.convert-using-latin-btn', func: () => { mysqlConvert( 'latin1' ) }  },
    { el: '.mysql-char-btn', func: () => { SQLCHAR( 'mysql' ) }  },
    { el: '.mssql-char-btn', func: () => { SQLCHAR( 'mssql' ) }  },
    { el: '.oracle-char-btn', func: () => { SQLCHAR( 'oracle' ) }  }
]

listenClicks( actionButtons );