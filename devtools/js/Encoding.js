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
        addToPayload( str );
    }
}

// base64 decode
function base64Decode()
{
    let str = getSelectedText();

    if( str != false )
    {
        str = atob( str );
        addToPayload( str );
    }
}


// URL encode
function urlEncode()
{
    let str = getSelectedText();

    if( str != false )
    {
        str = encodeURI( str );
        addToPayload( str );
    }
}

// URL Decode
function urlDecode()
{
    let str = getSelectedText();

    if( str != false )
    {
        str = decodeURI( str );
        addToPayload( str );
    }
}