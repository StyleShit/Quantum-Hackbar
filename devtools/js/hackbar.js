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
    { el: '.spaces-to-inline-comments-btn', func: spacesToInlineComments  }
]

listenClicks( actionButtons );