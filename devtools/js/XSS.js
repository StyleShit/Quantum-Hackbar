/**
 * XSS-Related Functions
 */


// convert string to chars array
function stringToCharArray( str )
{
    let charArray = [];
    let decimal;

    for ( let c = 0; c < str.length; c++ ) 
    {
        decimal = str.charCodeAt( c );
        charArray.push( decimal );
    }

    return charArray;
}


// convert selection to char code
function stringFromCharCode()
{
    let text = getSelectedText();
    
    if( text != false )
    {
        let charArray = stringToCharArray( text );
        let charString = 'String.fromCharCode(' + charArray.join( ', ' ) + ')';

        setSelectedText( charString );
    }
}


// convert selection to HTML chars
function htmlCharacters()
{
    let text = getSelectedText();
    
    if( text != false )
    {
        let charArray = stringToCharArray( text );
        let charString = '&#' + charArray.join( ';&#' ) + ';';

        setSelectedText( charString );
    }
}


// add XSS alert to payload
function xssAlertStatement()
{
    setSelectedText( '<script>alert(String.fromCharCode(88, 83, 83))</script>' );
}