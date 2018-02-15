/**
 * Encoding-Related Functions
 */

// base64 encode
function base64Encode()
{
    let str = getSelectedText();

    if( str != false )
    {
        str = btoa( str );
        setSelectedText( str );
    }
}

// base64 decode
function base64Decode()
{
    let str = getSelectedText();

    if( str != false )
    {
        str = atob( str );
        setSelectedText( str );
    }
}


// URL encode
function urlEncode()
{
    let str = getSelectedText();

    if( str != false )
    {
        str = encodeURI( str );
        setSelectedText( str );
    }
}


// URL Decode
function urlDecode()
{
    let str = getSelectedText();

    if( str != false )
    {
        str = decodeURI( str );
        setSelectedText( str );
    }
}