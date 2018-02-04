/**
 * SQL-Related Functions
 */

// add basic SQL info column to the payload
function basicInfoColum()
{
    addToPayload( 'CONCAT(user(),0x203a3a20,database(),0x203a3a20,version())' );
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
        addToPayload( out );
    });
}


// replace spaces in payload with inline SQL comments
function spacesToInlineComments()
{
    payloadInput.value = payloadInput.value.replace( /\s+/g, '/**/' );
}


// mysql convert
function mysqlConvert( encoding )
{
    let text = getSelectedText();
    
    if( text !== false )
        addToPayload( 'CONVERT(' + text + ' USING ' + encoding + ')' );
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

    addToPayload( charString );
}