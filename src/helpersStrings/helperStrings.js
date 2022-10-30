//
// Class
//
export default class helperStrings {
    //
    // Public - get
    //
    /**
     * @param {[]} argArrayOfStrings
     * @param {string} argStringDelimiter
     * */
    static getStringByCombiningArray = ( argArrayOfStrings, argStringDelimiter = "" ) => {
        if ( argArrayOfStrings.length === 0 ) { return "" }
        return argArrayOfStrings.reduce( ( itemStringPrev, itemString ) => itemStringPrev + argStringDelimiter + itemString )
    }
}
















































