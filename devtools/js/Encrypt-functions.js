/**
 * Encryption-Related Functions
 */

// encrypt selected text to { encryption }
function encrypt( encryption )
{
    let str = getSelectedText();
    
    if( str != false )
    {
        switch( encryption )
        {
            case 'md5':
                str = Encrypt.md5( str );
                break;

            case 'sha1':
                str = Encrypt.sha1( str );
                break;

            case 'sha256':
                str = Encrypt.sha2( str );
                break;

            case 'rot13':
                str = Encrypt.rot13( str );
                break;

            default:
                break;
        }

        setSelectedText( str );
    }
}